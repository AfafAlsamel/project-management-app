import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";
import { onSnapshot, collection, query, orderBy, doc } from "@firebase/firestore";
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
import { getBoardsState, getProjectsState, isNewProject, projectIdState, projectState, projectType, projectTypeState } from "../atoms/projectAtoms";
import Board from './Board';
import { boardState } from '../atoms/boardAtoms';





function Layout({ children }) {
  const { data: session } = useSession();


  const router = useRouter();;
  const { projectId, boardId } = router.query;

  const [projectOpen, setprojectOpen] = useRecoilState(projectState);
  const [projectType, setprojectType] = useRecoilState(projectTypeState);
  const [projectItem, setProjectItem] = useRecoilState(getProjectsState);
  const [ProjectIdState, setProjectIdState] = useRecoilState(projectIdState);
  const [selectedBoard, setSelectedBoard] = useRecoilState(getBoardsState);
  const [boardIndex, setBoardIndex] = useRecoilState(boardState) // use RecoilValue "project"

  const [isNew, setIsNew] = useRecoilState(isNewProject);
  const [projects, setProjects] = useState([]);
  // const [board, setBoard] = useState([]);



  const [boards, setBoards] = useState([]);
  const [boardOpen, setboardOpen] = useRecoilState(boardState);



  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "projects"), orderBy("timestamp", "asc")),
        (snapshot) => {
          setProjects(snapshot.docs);
          console.log(snapshot.docs);

        }
      ),
    [db]
  );

  // useEffect(

  //   () => {
  //     onSnapshot(doc(db, "projects", projectId ?? "1"), (snapshot) => {
  //       // setBoard(snapshot.data());
  //       console.log(snapshot.data());
  //       // setProjects(snapshot.docs);

  //     }),
  //     [db, projectId];
  //     // console.log(projects);

  //   }
  // );

  // useEffect(
  //   () => {
  //     onSnapshot(
  //       query(doc(db, "projects", projectId ?? "1")),
  //       (snapshot) => {
  //         // setProjects(snapshot.docs);

  //       }
  //     ),
  //     [db];
  //     console.log(projects);

  //     // console.log(projectId);

  //   }
  // );



  return (
    <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-black-100 cursor-default ">
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
                    console.log(project.data());
                    setIsNew(false);

                  }}
                >
                  <div
                    className="text-white flex items-center"
                    key={project.id} id={project.id}
                  >
                    <ChevronDownIcon className="w-5 h-5 text-white" />
                    {project?.data().projectDetails.title}
                  </div>
                  <button>
                    <DotsVerticalIcon className="w-5 h-5 text-white" />
                  </button>

                </div>

                <div /*src=selectedFile*/ className="text-gray-100">
                  {Object.values(project.data().boards).map((board, index) =>
                    <div
                      className="flex mt-2 items-center cursor-pointer"
                      onClick={() => {


                        setProjectItem(project.data());
                        setProjectIdState(project.id);
                        setBoardIndex(index);
                        console.log(index);

                        router.push({
                          pathname: router.pathname,
                          query: { ...router.query, myqueryparam: `projects/${project.id}/boards/${board.title}` }
                        });
                      }
                      }

                    >
                      {/* <div onClick={() => setSelectedBoard(board.columns)}></div> */}
                      <ClipboardListIcon className="w-5 h-5 text-gray-100" />
                      {board.title}

                    </div>

                  )}
                  {/* {project?.data().boards} */}
                </div>

              </div>

            </>
          ))
        } />
      <main className="pl-40 pt-16 max-w-max">

        <Board boardIndex={boardIndex}/>

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