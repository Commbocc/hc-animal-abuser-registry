import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import Offense from './Offense'

export default class Abuser {
  constructor (data) {
    this.imgSrc = data['Head Photo']
    this.name = data['name']
    this.aliases = data['alias']
    this.dob = moment(data['DOB'], 'MM-DD-YYYY')
    this.address = data['address']

    let offenses = data['offenses'].map(o => new Offense(o))
    this.offenses = _.orderBy(offenses, 'convictionDate', 'desc')

    this.latestConvictionDate = (this.offenses.length) ? _.first(this.offenses).convictionDate : null
  }

  static get mixin () {
    return {
      data: () => ({
        abusers: [],
        filterSearch: null,
        filterSort: 'latestConvictionDate',
        filterOrder: 'desc'
      }),
      methods: {
        fetchAbusers () {
          let apiUrl = 'https://apex-pub.hillsboroughcounty.org/apex/bocc.caar_get_json'
          // let apiUrl = 'https://public-solutions.hillsboroughcounty.org/enterprise/pub_prod.caar_get_json'
          axios.get(apiUrl).then(res => {
            this.abusers = res.data['abuser registry']['abusers'].map(a => new Abuser(a))
          })
        },
        searchAbusers (term) {
          return _.filter(this.abusers, a => {
            let props = [a.name, a.aliases, a.address]
            return _.includes(props.join(' ').toLowerCase(), term.toLowerCase())
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
          return _.orderBy(abusers, this.filterSort, this.filterOrder)
        }
      },
      mounted () {
        this.fetchAbusers()
      }
    }
  }
}
