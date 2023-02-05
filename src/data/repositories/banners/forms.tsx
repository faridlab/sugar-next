import { FormLayoutProps } from '@component/forms'

const forms: FormLayoutProps = [
  [
    {
      id: 'title',
      type: 'TextField',
      col: 8,
      label: 'Banner name',
      required: true,
      // used for dynamic props component
      props: {
        id: "form-banner-title",
        label: "Banner name"
      }
    }
  ],
  [
    {
      id: 'description',
      type: 'TextField',
      col: 8,
      label: 'Description',
      required: true,
      // used for dynamic props component
      props: {
        id: "form-banner-description",
        label: "Description",
        multiline: true
      }
    }
  ],
  [
    {
      id: 'banner',
      type: 'TextField',
      col: 8,
      label: 'File Banner',
      required: true,
      // used for dynamic props component
      props: {
        id: "form-banner-file",
        label: "Banner",
        type: 'file',
        accept: 'image/*'
      }
    }
  ],
  [
    {
      id: 'status',
      type: 'Radio',
      col: 8,
      label: 'Status',
      required: true,
      // used for dynamic props component
      props: {
        id: "form-banner-status",
        label: "Status",
        options: [
          {value: 'inactive', label: 'Inactive'},
          {value: 'active', label: 'Active'},
        ]
      }
    }
  ],
  [
      {
          id: 'order',
          type: 'TextField',
          col: 4,
          label: 'Order Number',
          required: true,
          // used for dynamic props component
          props: {
              id: "form-banner-order",
              type: 'number',
          }
      }
  ],
]

export default forms