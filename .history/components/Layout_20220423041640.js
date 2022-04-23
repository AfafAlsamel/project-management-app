import React from 'react';
import { useSession, signOut } from "next-auth/react";
import TopBar from './TopBar';
import SideBar from './SideBar';
import CreateProject from './CreateProject';
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { projectState, projectType, projectTypeState } from "../atoms/projectAtoms";



function Layout({ children }) {
    const { data: session } = useSession();
    
    const [projectOpen, setprojectOpen] = useRecoilState(projectState)
    const [projectType, setprojectType] = useRecoilState(projectTypeState)
    return (
        <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-black-100">
            <TopBar
                userName={session.user.name}
                userImage={session.user.image}
                userNameTag={session.user.tag}
                func={signOut}
            />
            <SideBar />
            <main className="pl-40 pt-16 max-w-max">
                {children}
            </main>
            {
          <AnimatePresence>
            {projectOpen && (
              <Modal handleClose={() => setprojectOpen(false)} type={projectType} comp={<CreateProject />}/>
            )}
          </AnimatePresence>
        }
        </div>
    );
}

export default Layout;