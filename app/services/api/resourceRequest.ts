import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const resourceApi = createApi({
  reducerPath: 'resourceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    fetch: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = resourceApi