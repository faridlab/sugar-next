import { FormLayoutProps } from '@component/forms'

const forms: FormLayoutProps = [
  [
    {
      id: 'title',
      type: 'TextField',
      col: 8,
      label: 'Title',
      required: true,
      props: {
        id: "form-content-title",
        label: "Title"
      }
    }
  ],
  [
    {
      id: 'excerpt',
      type: 'TextField',
      col: 8,
      label: 'Excerpt',
      required: false,
      props: {
        id: "form-content-excerpt",
        label: "Excerpt"
      }
    }
  ],
  [
    {
      id: 'content',
      type: 'TextField',
      col: 8,
      label: 'Content',
      required: true,
      props: {
        id: "form-content-description",
        label: "Content",
        multiline: true
      }
    }
  ],
]

export default forms