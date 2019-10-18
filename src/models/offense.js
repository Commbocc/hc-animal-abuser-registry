import moment from 'moment'

export default class Offense {
  constructor (data) {
    // console.log(data);
    this.description = data['Offense']
    this.counts = data['Counts']
    this.convictionDate = moment(data['Conviction Date'], 'MM-DD-YYYY') || moment()
    this.expirationDate = moment(data['Expires from Registry'], 'MM-DD-YYYY')
    this.judgement = data['Judgment']
  }
}
