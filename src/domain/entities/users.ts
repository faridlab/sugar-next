import Resources from "@domain/entities/resources"
import { UserStatus } from '@domain/entities/enums'
import { UUID } from '@domain/entities/types'

export default interface Users extends Resources {
  id?: UUID;

  first_name: string;
  last_name: string;
  username: string;
  email: string;

  email_verified_at?: string;
  password?: string;
  status?: UserStatus;

  dob?: any;
}
