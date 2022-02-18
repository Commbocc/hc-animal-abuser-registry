// import moment from 'moment'

export default class Offense {
  constructor(data) {
    this.description = data['offenseDescription']
    this.counts = data['counts']
    this.convictionDate = data['convictionDate'] || null
    this.expirationDate = data['expiresFromRegistry'] || null
    this.judgement = data['judgement'] || null
  }
}
