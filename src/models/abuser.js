import { orderBy as _orderBy, first as _first } from 'lodash'
import Offense from './offense'

export default class Abuser {
  constructor(data) {
    this.imgSrc = data['headPhoto']
    this.name = data['name']
    this.aliases = data['alias']
    this.dob = data['dob']
    this.address = data['address']

    let offenses = data['offenses'].map((o) => new Offense(o))
    this.offenses = _orderBy(offenses, 'convictionDate', 'desc')

    this.latestConvictionDate = this.offenses.length
      ? _first(this.offenses).convictionDate
      : null
  }
}
