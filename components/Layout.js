import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import {
  ClipboardListIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";
import TopBar from './TopBar';
import SideBar from './SideBar';
import CreateProject from '../components/Form/CreateProject';
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { getProjectsState, isNewProject, projectState, projectType, projectTypeState } from "../atoms/projectAtoms";
import Board from './Board';



function Layout({ children }) {
  const { data: session } = useSession();

  const [projectOpen, setprojectOpen] = useRecoilState(projectState);
  const [projectType, setprojectType] = useRecoilState(projectTypeState);
  const [projectItem, setProjectItem] = useRecoilState(getProjectsState);
  const [isNew, setIsNew] = useRecoilState(isNewProject);




  const [projects, setProjects] = useState([]);
  const router = useRouter();


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

            <>
              <div>
                <div
                  className="bg-black-300 py-1 text-base rounded mt-2 text-gray-100 flex items-center justify-between"
                  // onClick={() => router.push(`/${project.id}`)}
                  onClick={() => {
                    setprojectOpen(true);
                    setprojectType("projectModal");
                    setProjectItem(project.data());
                    setIsNew(false);

                  }}
                >
                  <div
                    className="text-white flex items-center"
                    key={project.id} id={project.id}
                  >
                    <ChevronDownIcon className="w-5 h-5 text-white" />
                    {project?.data().title}
                  </div>
                  <button>
                    <DotsVerticalIcon className="w-5 h-5 text-white" />
                  </button>

                </div>

                <div /*src=selectedFile*/ className="text-gray-100">
                  {Object.values(project.data().boards).map((board) =>
                    <div className="flex mt-2 items-center">
                      <ClipboardListIcon className="w-5 h-5 text-gray-100" />
                      {board.title}
                    </div>)}
                  {/* {project?.data().boards} */}
                </div>

              </div>

            </>
          ))
        } />
      <main className="pl-40 pt-16 max-w-max">
        <Board />
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