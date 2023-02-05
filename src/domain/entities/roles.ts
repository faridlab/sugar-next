import Resources from "@domain/entities/resources"
import { UUID } from '@domain/entities/types'

export default interface Roles extends Resources {
  id?: UUID | number;

  name: string;
  guard_name: string;
}