import { FormLayoutProps } from '@component/forms'

const forms: FormLayoutProps = [
  [
    {
      id: 'username',
      type: 'TextField',
      col: 8,
      label: 'Username',
      required: true,
      props: {
        id: "form-profile-username",
        label: "Username"
      }
    }
  ],
  [
    {
      id: 'email',
      type: 'TextField',
      col: 8,
      label: 'Email',
      required: true,
      props: {
        id: "form-profile-email",
        label: "Email"
      }
    }
  ],
  [
    {
      id: 'first_name',
      type: 'TextField',
      col: 4,
      label: 'First Name',
      required: true,
      props: {
        id: "form-profile-firstname",
        label: "First Name"
      }
    },
    {
      id: 'last_name',
      type: 'TextField',
      col: 4,
      label: 'Last Name',
      required: true,
      props: {
        id: "form-profile-lastname",
        label: "Last Name"
      }
    }
  ],
  [
    {
      id: 'phone',
      type: 'TextField',
      col: 4,
      label: 'Phone',
      required: true,
      props: {
        id: "form-profile-phone",
        label: "Phone"
      }
    }
  ],
  [
    {
      id: 'dob',
      type: 'TextField',
      col: 4,
      label: 'Birth Date',
      required: true,
      props: {
        id: "form-profile-dob",
        label: 'Birth Date',
        type: 'date'
      }
    },
    {
      id: 'gender',
      type: 'Radio',
      col: 4,
      label: 'Gender',
      required: true,
      props: {
        id: "form-profile-gender",
        label: 'Gender',
        options: [
          { value: 'male', label: 'Male'},
          { value: 'female', label: 'Female'}
        ]
      }
    },
  ],
]

export default forms