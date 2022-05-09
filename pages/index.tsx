import type { NextPage } from 'next'
import Head from 'next/head'
import BottomNav from '../components/BottomNav'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="https://links.papareact.com/jjm" />
      </Head>

      {/**Header */}
      <Header />
      {/**Feed */}
      <Feed />
      <BottomNav />

      <Modal />
    </div>
  )
}

export default Home
