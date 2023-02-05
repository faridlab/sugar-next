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
        id: "form-provinces-name",
        label: "Province Name"
      }
    },
    {
      id: 'country_id',
      type: 'Reference',
      col: 4,
      label: 'Country',
      required: false,
      props: {
        id: "form-reference-country",
        label: "Country",
        getOptionLabel: (option: Record<string, any>) => {
          return option.name || ''
        }
      }, // used for dynamic props component
      reference: {
        endpoint: 'countries',
        params: {}
      }
    },
  ],
]

export default forms