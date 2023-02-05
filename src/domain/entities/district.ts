import Resources from "@domain/entities/resources"
import City from "@domain/entities/city"

export default interface District extends Resources {
  name: string
  city_id: number
  city?: City
}