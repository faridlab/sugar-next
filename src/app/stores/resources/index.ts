import resourceReducer from "./reducers"

export {
  selectResource
} from './selectors'

export {
  fetch,
  create,
  update,
  detail,
  patch,
  trash,
  trashed,
  destroy,
  hardDelete,
  restore,
} from './actions'

export default resourceReducer