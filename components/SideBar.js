import React from 'react';
import { UserGroupIcon, ServerIcon, CalendarIcon, ChartSquareBarIcon,
CogIcon } from '@heroicons/react/outline';
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { projectState, projectType, projectTypeState } from "../atoms/projectAtoms";


function SideBar(props) {
  const [projectOpen, setprojectOpen] = useRecoilState(projectState)
  const [projectType, setprojectType] = useRecoilState(projectTypeState)
    return (
        <div className="fixed inset-y-0 left-0 bg-black-200 border-2 border-r-black-300 w-48">
            <h1 className="flex items-center justify-center text-2xl
            h-16 bg-black-200 text-white font-bold">hussle</h1>

            <button className='bg-[#487690] text-white p-[7px] px-10 mt-6  cursor-pointer  rounded-[5px]'
            onClick={() => { setprojectOpen(true); setprojectType("dropIn"); }}>Create Project </button>
            <p className='pt-6 text-sm text-white font-semibold'>Projects</p>
        </div>
    );
}

export default SideBar;