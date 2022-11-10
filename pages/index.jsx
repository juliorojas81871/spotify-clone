import Head from "next/head";
import { Dashboard } from "../components";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Sportify Clone - Dashboard</title>
        <link rel="icon" href="/spotify.png" />
      </Head>
      {/* dashboard */}
      <Dashboard />
    </div>
  );
};

export default Home;
