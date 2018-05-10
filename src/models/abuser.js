import _ from 'lodash'
import Offense from './offense'

function Abuser (data) {
  this.imgSrc = data['Head Photo']
  this.name = data['name']
  this.aliases = data['alias']
  this.dob = new Date(data['DOB'])
  this.address = data['address']

  let offenses = data['offenses'].map(o => new Offense(o))
  this.offenses = _.orderBy(offenses, 'convictionDate', 'desc')

  this.latestConvictionDate = _.first(this.offenses).convictionDate
}

Abuser.mixin = {
  data () {
    return {
      abusers: []
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
        let preds = [a.name, a.aliases, a.address]
        return _.includes(preds.map(p => p.toLowerCase()).join(' '), term.toLowerCase())
      })
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
