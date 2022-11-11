export interface ICoupon {
  id: number
  code: string
  endDate: Date
  startDate: Date
  amount: number
  percentage: number
  useLimit: number
}
