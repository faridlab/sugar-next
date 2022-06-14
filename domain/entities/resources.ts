export default interface Resources {
  id?: string | number | null // NOTE: it will be defined when data fetched

  created_at?: string | null // TODO: should has datetime string pattern type | interface
  updated_at?: string | null // TODO: should has datetime string pattern type | interface
  deleted_at?: string | null // TODO: should has datetime string pattern type | interface

  created_by?: number | string | object | null
  updated_by?: number | string | object | null
  deleted_by?: number | string | object | null
}