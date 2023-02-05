import Resources from "@domain/entities/resources"
import District from "@domain/entities/district"
import Subdistrict from "./subdistrict"
import Country from "./country"
import Province from "./province"
import City from "./city"

export default interface Postalcode extends Resources {
  postal_code: string
  country_id: number
  country?: Country
  province_id: number
  province?: Province
  city_id: number
  city?: City
  district_id: number
  district?: District
  subdistrict_id: number
  subdistrict?: Subdistrict
}