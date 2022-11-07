export interface IPriceChange {
  id:number
  sale:boolean
  newPrice:number
  startDate:Date
  endDate:Date
  couponLeft: number
}
