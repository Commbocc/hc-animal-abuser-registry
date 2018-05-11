import _ from 'lodash'
import moment from 'moment'
import Offense from './offense'

function Abuser (data) {
  this.imgSrc = data['Head Photo']
  this.name = data['name']
  this.aliases = data['alias']
  this.dob = moment(data['DOB'], 'MM-DD-YYYY')
  this.address = data['address']

  let offenses = data['offenses'].map(o => new Offense(o))
  this.offenses = _.orderBy(offenses, 'convictionDate', 'desc')

  this.latestConvictionDate = _.first(this.offenses).convictionDate
}

Abuser.mixin = {
  data () {
    return {
      abusers: [],
      filterSearch: null,
      filterSort: 'latestConvictionDate',
      filterOrder: 'desc'
    }
  },
  methods: {
    fetchAbusers () {
      let apiUrl = 'https://apex-pub.hillsboroughcounty.org/apex/bocc.caar_get_json'
      fetch(apiUrl).then(res => res.json()).then(json => {
        this.abusers = json['abuser registry']['abusers'].map(a => new Abuser(a))
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

export default Abuser
