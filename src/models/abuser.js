import { orderBy as _orderBy, first as _first, includes as _includes, filter as _filter } from 'lodash'
import axios from 'axios'
import moment from 'moment'
import Offense from './offense'

function Abuser (data) {
  this.imgSrc = data['Head Photo']
  this.name = data['name']
  this.aliases = data['alias']
  this.dob = moment(data['DOB'], 'MM-DD-YYYY')
  this.address = data['address']

  let offenses = data['offenses'].map(o => new Offense(o))
  this.offenses = _orderBy(offenses, 'convictionDate', 'desc')

  this.latestConvictionDate = _first(this.offenses).convictionDate
}

Abuser.mixin = {
  data: () => ({
    abusers: [],
    filterSearch: null,
    filterSort: 'latestConvictionDate',
    filterOrder: 'desc'
  }),
  methods: {
    fetchAbusers () {
      let apiUrl = 'https://apex-pub.hillsboroughcounty.org/apex/bocc.caar_get_json'
      axios.get(apiUrl).then(response => {
        this.abusers = response.data['abuser registry']['abusers'].map(a => new Abuser(a))
      })
    },
    searchAbusers (term) {
      return _filter(this.abusers, a => {
        let props = [a.name, a.aliases, a.address]
        return _includes(props.join(' ').toLowerCase(), term.toLowerCase())
      })
    },
    resetFilters () {
      this.filterSearch = null
      this.filterSort = 'latestConvictionDate'
      this.filterOrder = 'desc'
    }
  },
  computed: {
    filteredAbusers () {
      let abusers = (this.filterSearch) ? this.searchAbusers(this.filterSearch) : this.abusers
      return _orderBy(abusers, this.filterSort, this.filterOrder)
    }
  },
  mounted () {
    this.fetchAbusers()
  }
}

export default Abuser
