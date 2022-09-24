import { getSession } from "next-auth/react";
import Head from "next/head";
import { Sidebar, Center, Player } from "../components/index";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone App</title>
      </Head>
      <main className=''>
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export default Home
