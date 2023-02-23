import { FormLayoutProps } from '@component/forms'

const forms: FormLayoutProps = [
  [
    {
      id: 'name',
      type: 'TextField',
      col: 4,
      label: '',
      required: false,
      // used for dynamic props component
      props: {
        id: "form-countries-name",
        label: "Country"
      }
    }
  ],
  [
    {
      id: 'isocode',
      type: 'TextField',
      col: 2,
      label: 'ISO Code',
      required: false,
      props: {
        id: "form-countries-isocode",
        label: "ISO Code"
      } // used for dynamic props component
    },
    {
      id: 'phonecode',
      type: 'TextField',
      col: 2,
      label: 'Phone Code',
      required: false,
      props: {
        id: "form-countries-phonecode",
        label: "Phone Code"
      } // used for dynamic props component
    }
  ]
]

export default forms