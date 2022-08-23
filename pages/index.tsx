import Layout from '@app/layouts/layout'
import { NextPageWithLayout } from '@app/utils/pageTypes'
import Head from 'next/head'
import { ReactElement } from 'react'
import styles from '../styles/Home.module.css'

const HomePage: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Startapp</title>
        <meta name="description" content="Startapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://startapp.id">Startapp</a>
        </h1>
      </main>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default HomePage
