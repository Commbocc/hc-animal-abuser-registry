function Offense (data) {
  this.description = data['Offense']
  this.counts = data['Counts']
  this.convictionDate = new Date(data['Conviction Date'])
  this.expirationDate = new Date(data['Expires from Registry'])
  this.judgement = data['Judgment']
}

export default Offense
