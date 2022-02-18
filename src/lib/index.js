import { reactive, computed } from 'vue'
// import axios from 'axios'
import Abuser from '../models/abuser'
import {
  orderBy as _orderBy,
  filter as _filter,
  includes as _includes,
} from 'lodash'

export const API_URL = 'https://app.hillsboroughcounty.org/CAAR/Abuser'

// abusers

export const abusers = reactive({
  loading: false,
  error: '',
  data: [],
})

export async function fetchAbusers() {
  abusers.loading = true
  try {
    const url = import.meta.env.DEV ? '/api' : API_URL
    const data = await fetch(url)
      .then((x) => x.json())
      .catch((err) => {
        throw new Error('Unable to fetch records from server.')
      })
    abusers.data = data.map((x) => new Abuser(x))
  } catch (error) {
    abusers.error = error.message
  } finally {
    abusers.loading = false
  }
}

// filters

export const filters = reactive({
  searchTerm: '',
  sort: 'latestConvictionDate',
  order: 'desc',
})

export function resetFilters() {
  filters.searchTerm = ''
  filters.sort = 'latestConvictionDate'
  filters.order = 'desc'
}

export const filteredAbusers = computed(() => {
  let data = filters.searchTerm
    ? _filter(abusers.data, ({ name, aliases, address }) =>
        _includes(
          [name, aliases, address].join(' ').toLowerCase(),
          filters.searchTerm.toLowerCase()
        )
      )
    : abusers.data
  return _orderBy(data, filters.sort, filters.order)
})
