import React from 'react';
import { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import TopBar from './TopBar';
import SideBar from './SideBar';
import CreateProject from '../components/Form/CreateProject';
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { projectState, projectType, projectTypeState } from "../atoms/projectAtoms";



function Layout({ children }) {
  const { data: session } = useSession();

  const [projectOpen, setprojectOpen] = useRecoilState(projectState)
  const [projectType, setprojectType] = useRecoilState(projectTypeState)


  const [projects, setProjects] = useState([]);

  // CLEAN
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "projects"), orderBy("timestamp", "asc")),
        (snapshot) => {
          setProjects(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-black-100">
      <TopBar
        userName={session.user.name}
        userImage={session.user.image}
        userNameTag={session.user.tag}
        func={signOut}
      />
      <SideBar comp=
        {
          projects.map((project) => (
            <div id="form-file-text" className="bg-black-300 py-1 px-4 rounded mt-2 text-gray-100 flex">

              <div /*src=selectedFile*/ className="text-white" key={project.id} id={project.id}>
                {project?.data().title}
              </div>
            </div>
          ))
        } />
      <main className="pl-40 pt-16 max-w-max">
        {children}
      </main>
      {
        <AnimatePresence>
          {projectOpen && (
            <Modal handleClose={() => setprojectOpen(false)} type={projectType} comp={<CreateProject />} />
          )}
        </AnimatePresence>
      }
    </div>
  );
}

export default Layout;