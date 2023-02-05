import { FunctionComponent } from "react"
import FormGenerator from "@component/forms/formGenerator"
import TextField from '@component/forms/components/textField'
import Checkbox from '@component/forms/components/checkbox'
import Radio from '@component/forms/components/radio'
import Rating from '@component/forms/components/rating'
import Switch from '@component/forms/components/switch'
import Slider from '@component/forms/components/slider'
import Select from '@component/forms/components/select'
import FormContext from '@component/forms/contexts'

export interface FormPropsComponent {
  create?: FunctionComponent;
  show?: FunctionComponent;
  edit?: FunctionComponent;
}

export interface FormProps {
  id: string;
  col?: number;
  required?: boolean;
  label?: string;
  type: string;
  component?: FunctionComponent<FormProps> | FormPropsComponent // FIXME: this type arise error on react run time, should i remove this type?
  props: Record<string, any>, // used for dynamic props component
  reference?: Record<string, any>,
}

export type FormLayoutProps = Array<FormProps[]>

export default FormGenerator
export {
  FormContext,

  TextField,
  Checkbox,
  Radio,
  Rating,
  Switch,
  Slider,
  Select
}
