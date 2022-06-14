import Resources from "@domain/entities/resources"
import District from "@domain/entities/district"

export default interface Subdistrict extends Resources {
  name: string
  district_id: number
  district?: District
}