import { Sidebar, Center, Player } from "../components/index";
import { getSession, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="overflow-hidden scrollbar-hide flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

// to prevent the http 403
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Home;
