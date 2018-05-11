import moment from 'moment'

function Offense (data) {
  this.description = data['Offense']
  this.counts = data['Counts']
  this.convictionDate = moment(data['Conviction Date'], 'MM-DD-YYYY')
  this.expirationDate = moment(data['Expires from Registry'], 'MM-DD-YYYY')
  this.judgement = data['Judgment']
}

export default Offense
