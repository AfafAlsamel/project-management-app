import Head from "next/head";
import Layout from "../components/Layout";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login"
import Board from "../components/Board";




export default function Home({ trendingResults, followResults, providers }) {



  const { data: session } = useSession();


  if (!session) return <Login providers={providers} />;


  
 

  return (
    <Layout>


    </Layout>
  );
}


export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
