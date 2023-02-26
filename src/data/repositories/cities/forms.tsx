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
        label: "Province"
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
        updateValues: ['province_id'], // update values to be null on value changed
      }
    },
    {
      id: 'province_id',
      type: 'Reference',
      col: 4,
      label: 'Province',
      required: false,
      props: {
        id: "form-reference-province",
        label: "Province",
        getOptionLabel: (option: Record<string, any>) => {
          return option.name || ''
        }
      }, // used for dynamic props component
      reference: {
        endpoint: 'provinces',
        params: ['country_id'], // additional params on searching
      }
    },
  ],
]

export default forms