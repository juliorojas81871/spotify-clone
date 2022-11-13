import Head from "next/head";
import { Dashboard } from "../components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {Loader} from '../components'

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  // Loading animation...
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Sportify Clone - Dashboard</title>
        <link rel="icon" href="/spotify.png" />
      </Head>
      <Dashboard />
    </div>
  );
};

export default Home;
