import React from 'react';
import { useRecoilState } from "recoil";
import { projectState, projectType, projectTypeState } from "../atoms/projectAtoms";


import { XIcon } from "@heroicons/react/outline";



function SideBar({ comp }) {
    const [projectOpen, setprojectOpen] = useRecoilState(projectState)
    const [projectType, setprojectType] = useRecoilState(projectTypeState)
    return (
        <div className="fixed inset-y-0 left-0 bg-black-200 border-2 border-r-black-300 w-48 p-4">
            <h1 className="flex items-center justify-center text-2xl
            h-16 bg-black-200 text-white font-bold">hussle</h1>

            <button className='bg-primary text-white px-4 py-2 mt-6 cursor-pointer rounded w-full'
                onClick={() => { setprojectOpen(true); setprojectType("dropIn"); }}>Create Project </button>
            <p className='pt-6 text-sm text-white font-semibold'>Projects</p>

            {comp}

  

        </div>
    );
}

export default SideBar;