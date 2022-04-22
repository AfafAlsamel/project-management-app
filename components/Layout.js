import React from 'react';
import { useSession, signOut } from "next-auth/react";



import TopBar from './TopBar';
import SideBar from './SideBar';




function Layout({ children }) {
    const { data: session } = useSession();

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
        </div>
    );
}

export default Layout;