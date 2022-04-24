import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import {
    PaperClipIcon,
    PlusIcon,
    UserGroupIcon,
    CogIcon,
    XIcon,
} from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Field from './Field'
import SectionTitle from './Form/SectionTitle';
import BoardTiltle from './Form/BoardTiltle';
import MemberTitle from './Form/MemberTitle';



function CreateProject() {

    const [projectDetails, setProjectDetails] = useState("");
    const [projectTitle, setprojectTitle] = useState("");
    const [projectDate, setprojectDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [boardTitle, setboardTitle] = useState("");
    const [boardType, setboardType] = useState("");
    const [open, setIsOpen] = useState(false);

    const sendProject = async () => {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "Projects"), {
            // id: session.user.uid,
            // username: session.user.name,
            // userImg: session.user.image,
            // tag: session.user.tag,
            title: projectTitle,
            date: projectDate,
            details: projectDetails,
            boardtitle: boardTitle,
            type:boardType,
            timestamp: serverTimestamp(),
        });

        setLoading(false);
        setprojectTitle("");
        setprojectDate("");
        setProjectDetails("");
        setboardTitle("");
        setboardType("");
    };

    
    return (
        <div className="space-y-4 divide-y divide-black-300">
            <div className="flex space-x-4 divide-x divide-black-300">

                {/*Project section*/}
                <div className="w-1/3 space-y-8 p-5">
                    <div className="space-y-9">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Project settings" />
                        <Field
                            fieldValue={projectTitle}
                            fieldFunc={(e) => setprojectTitle(e.target.value)}
                            fieldType="text"
                            fieldId="project title"
                            title="project title"
                            placeHolder="Ex: today todos checklist"
                        />

                        <div><label className='text-sm text-gray-100'>Description </label>
                            <textarea
                                value={projectDetails}
                                onChange={(e) => setProjectDetails(e.target.value)}
                                title="Des"
                                placeholder="Add project details"
                                className="bg-transparent border-b border-black-300 outline-none text-white text-lg tracking-wide w-full max-h-[500px] min-h-[50px]">
                            </textarea>
                        </div>

                        <Field
                            fieldValue={projectDate}
                            fieldFunc={(e) => setprojectDate(e.target.value)}
                            fieldType="date"
                            fieldId="Date"
                            title="Duration"
                        />
                    </div>
                </div>


                {/*Board section*/}
                <div className=" justify-between items-center overflow-auto w-1/3 divide-black-300 p-4 space-y-4">
                    <BoardTiltle iconn={<MdOutlineSpaceDashboard className="w-5 h-5 text-white" />} textt="Boards" />

                 {open ? (
                <div class="w-full max-w-lg p-5">
                            <form class="bg-black-100 flex justify-center shadow-xl rounded px-8 pt-6 pb-8 ">
                                    <div className="w-full space-y-5 ">
                                        <div className="space-y-3"> 
                                        <div class="flex items-center justify-between">
                                        <h2 className='text-white font-bold'>Add Board</h2>
                                        <button class="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default" type="button"
                                       onClick={sendProject} >Save</button>
                                        
                                </div>
                                        <Field
                                          fieldValue={boardTitle}
                                          fieldFunc={(e) => setboardTitle(e.target.value)}
                                          fieldType="text"
                                          fieldId=" board Title"
                                          title="Title"
                                         placeHolder="Ex: today todos checklist"
                                            />
                                      </div>
                                <div class="flex items-center justify-between ">
                                <label  className='text-gray-100'>Methdology : </label>
                                    <select class="bg-black-100 appearance-none w-32 text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                  value={boardType}
                                  onChange={(e) => setboardType(e.target.value)}
                                  >
                                            <option>Scrum </option>
                                            <option>WaterFull</option>
                                            <option>Agile</option>
                                    </select>
                                </div>
                             </div>
                         </form>
                     </div>
                 ) : (
                    <button className='flex items-center cursor-pointer text-gray-100 '
                    onClick={() => setIsOpen(true)} > Add </button>
                 )}
                     
                </div>


                {/*Members section*/}
                <div className="w-1/3 space-y-8 p-4">
                    <MemberTitle icone={<BsFillPersonLinesFill className="w-5 h-5 text-white" />} texte="Members" />
                </div>
            </div>

            <div className="pt-4">
                <button
                    className="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default"
                    disabled={!projectDetails.trim()}
                    onClick={sendProject} >
                    Save project
                </button>
            </div>

        </div>

    );
}

export default CreateProject