import Resources from "@domain/entities/resources"
import Country from "@domain/entities/country"
import City from "@domain/entities/city"

export default interface Province extends Resources {
  name: string
  country_id: number
  country?: Country
  cities?: City[]
}