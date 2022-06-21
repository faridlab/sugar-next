import Resources from "@domain/entities/resources"
import Province from "@domain/entities/province"
import City from "@domain/entities/city"

export default interface Country extends Resources {
  isocode: string | null
  name: string | null
  phonecode: number | null

  provinces?: Province[]
  cities?: City[]
}