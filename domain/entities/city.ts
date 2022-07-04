import Resources from "@domain/entities/resources"
import Country from "@domain/entities/country"
import Province from "@domain/entities/province"

export default interface City extends Resources {
  id: string | number | null;
  name: string | null;
  country_id: number | string | null;
  province_id: number | string | null;
  country?: Country;
  province?: Province;
}