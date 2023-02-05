import Resources from "@domain/entities/resources"
import Province from "@domain/entities/province"
import City from "@domain/entities/city"

export default interface Country extends Resources {
  id: string | number | null;
  isocode: string | null;
  name: string | null;
  phonecode: string | null;

  provinces?: Province[];
  cities?: City[];
}