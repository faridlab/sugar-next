import Resources from "@domain/entities/resources"
import { UUID } from '@domain/entities/types'

export default interface Permissions extends Resources {
  id?: UUID | number;

  name: string;
  guard_name: string;
}