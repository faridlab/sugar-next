import { FunctionComponent } from "react"
import FormGenerator from "./formGenerator"
import TextField from './textField'

export interface FormPropsComponent {
  create?: FunctionComponent
  show?: FunctionComponent
  edit?: FunctionComponent
}

export interface FormProps {
  id: string
  col?: number
  required?: boolean
  label?: string
  type: string
  // component?: FunctionComponent<FormProps> | FormPropsComponent // FIXME: this type arise error on react run time, should i remove this type?
  props: object // used for dynamic props component
}

export type FormLayoutProps = Array<FormProps[]>

export default FormGenerator
export {
  TextField
}