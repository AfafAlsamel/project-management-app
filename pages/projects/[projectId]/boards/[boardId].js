import React from 'react'
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import { db } from "../../../../firebase";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Layout from "../../../../components/Layout";
import Login from '../../../../components/Login';



function projectPage({trendingResults, followResults, providers }) {
    const { data: session } = useSession();
    const [project, setProject] = useState();

    const router = useRouter();
    const { projectId, boardId } = router.query;


    useEffect(
        () =>
            onSnapshot(doc(db, "projects", projectId, "boards", boardId), (snapshot) => {
                setProject(snapshot.data());
            }),
        [db]
    );


    if (!session) return <Login providers={providers} />;



    return (

        <Layout>


        </Layout>
    )
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

export default projectPage