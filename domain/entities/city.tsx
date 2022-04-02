import Resources from "@domain/entities/resources"
import Country from "@domain/entities/country"
import Province from "@domain/entities/province"

export default interface City extends Resources {
  name: string
  country_id: number
  province_id: number
  country?: Country
  province?: Province
}