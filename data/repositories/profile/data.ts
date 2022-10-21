import Users from "@domain/entities/users";
import { UserStatus } from '@domain/entities/enums'

const data: Users = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  status: UserStatus.inactive,
  dob: ''
}

export default data