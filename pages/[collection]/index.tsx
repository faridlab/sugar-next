import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks'

import {
  fetch,
} from '../../app/stores/resources'

import {
  selectResource
} from '../../app/stores/resources'

const CollectionPage: NextPage = () => {
  const router = useRouter()
  const { collection } = router.query
  const url = `/${collection}`

  const [ params, setParams ] = useState({page: 1, limit: 25})

  const dispatch = useAppDispatch()
  const {
    data,
    response,
    pending,
    error,
  } = useAppSelector(selectResource)

  useEffect(() => {
    if(!router.isReady) return
    dispatch(fetch({url}))
  }, [dispatch, params, url, router.isReady])

  return (
    <>
      <Head>
        <title>Collection</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Collection Page {pending}
        </h1>
      </main>
    </>
  )
}

export default CollectionPage
