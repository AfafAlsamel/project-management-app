import React, { useState } from 'react';
import {
    PaperClipIcon,
    PlusIcon,
    PlusCircleIcon,
    CogIcon,
    XIcon,
} from "@heroicons/react/outline";
import { db, storage } from "../../firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Field from '../Field'
import SectionTitle from './SectionTitle';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from "recoil";
import { getProjectsState, isNewProject } from '../../atoms/projectAtoms';
// import { getProjectsState } from "../atoms/projectAtom";






function CreateProject() {

    const { data: session } = useSession();

    const [projectDetails, setProjectDetails] = useState("");
    const [projectTitle, setprojectTitle] = useState("");
    const [projectData, setprojectData] = useState("");
    const [boardFields, setboardFields] = useState([
        { title: '', select: '' },
    ])
    const [loading, setLoading] = useState(false);


    const project = useRecoilValue(getProjectsState);
    const isNew = useRecoilValue(isNewProject);





    const handleSelect = (e) => {

        console.log(e);

        setValue(e)

    }

    const sendProject = async () => {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "projects"), {
            id: session.user.uid,
            title: projectTitle,
            date: projectData,
            details: projectDetails,
            boards: boardFields,
            timestamp: serverTimestamp(),
        });

        // const dbInstance = collection(db, `projects/${docRef.id}/board`);


        setLoading(false);
        setprojectTitle("");
        setprojectData("");
        setProjectDetails("");
        setboardFields({ title: '', select: '' })


    };

    {/*const sendBoard = async () => {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "Boards"), {
            boardtitle: boardTitle,
            type:boardType,
            timestamp: serverTimestamp(),
        });

        setLoading(false);
        setboardFields([...boardFields, object])
    };
*/}

    const handleFormChange = (event, index) => {
        let data = [...boardFields];
        data[index][event.target.name] = event.target.value;
        setboardFields(data);
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(boardFields)
    }

    const addBoard = () => {
        let object = {
            title: '',
            select: ''
        }

        setboardFields([...boardFields, object])
    }






    return (
        <div className="space-y-4 divide-y divide-black-300">
            <div className="flex space-x-4 divide-x divide-black-300">

                {/*Project section*/}
                <div className="w-1/3 space-y-8 p-5">
                    <div className="space-y-9">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Project settings" />
                        <Field
                            fieldValue={isNew ? projectTitle : project.title}
                            fieldFunc={(e) => setprojectTitle(e.target.value)}
                            fieldType="text"
                            fieldId="project title"
                            title="project title"
                            placeHolder="Ex: today todos checklist"
                        />

                        <div><label className='text-sm text-gray-100'>Description </label>
                            <textarea
                                value={isNew ? projectDetails : project.details}
                                onChange={(e) => setProjectDetails(e.target.value)}
                                title="Des"
                                placeholder="Add project details"
                                className="bg-transparent border-b border-black-300 outline-none text-white text-lg tracking-wide w-full max-h-[500px] min-h-[50px]">
                            </textarea>
                        </div>

                        <Field
                            fieldValue={isNew ? projectData : project.date}
                            fieldFunc={(e) => setprojectData(e.target.value)}
                            fieldType="date"
                            fieldId="Date"
                            title="Duration"
                        />
                    </div>
                </div>


                {/*Board section*/}
                <div className=" justify-between items-center overflow-auto w-1/3 divide-black-300 p-4 space-y-4">

                    <div className="flex justify-between">

                        <SectionTitle icon={<MdOutlineSpaceDashboard className="w-5 h-5 text-white" />} text="Boards" />

                        <button className='flex items-center cursor-pointer text-gray-100 '
                            onClick={addBoard} >
                            <PlusIcon className="w-5 h-5 text-gray-100" />
                            Add
                        </button>

                    </div>

                    <div class=" w-full max-w-lg">
                        {isNew ? (
                            <form class="flex flex-col space-y-4 overflow-y-auto h-80 max-h-fit">
                                {Object.values(boardFields).map((board, index) => {
                                    return (
                                        <div className="w-full space-y-5 p-4 border border-black-300  rounded" key={index}>
                                            <div className="space-y-3">
                                                <div class="flex items-center justify-between">
                                                    <h2 className='text-white font-bold'>New board</h2>
                                                    <button class="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default" type="button"
                                                        onClick={submit} >Save</button>

                                                </div>
                                                <Field
                                                    fieldValue={board.name}
                                                    fieldFunc={event => handleFormChange(event, index)}
                                                    fieldType="text"
                                                    fieldId="board Title"
                                                    title="Title"
                                                    name="title"
                                                    placeHolder="Ex: today todos checklist"
                                                />
                                            </div>
                                            <div class="flex items-center justify-between ">
                                                <label className='text-gray-100'>Methdology : </label>
                                                <select class="bg-black-100 appearance-none w-32 text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                    value={board.select}
                                                    onChange={event => handleFormChange(event, index)}
                                                    name="select"

                                                >
                                                    <option>Scrum </option>
                                                    <option>WaterFull</option>
                                                    <option>Agile</option>
                                                </select>
                                            </div>

                                        </div>
                                    )
                                })

                                }
                            </form>) : (
                            Object.values(project.boards).map((board, index) =>
                                <div className="w-full space-y-5 p-4 border border-black-300  rounded" key={index}>
                                    <div className="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <h2 className='text-white font-bold'>New board</h2>
                                            <button class="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default" type="button"
                                                onClick={submit} >Save</button>

                                        </div>
                                        <Field
                                            fieldValue={board.title}
                                            // fieldFunc={event => handleFormChange(event, index)}
                                            fieldType="text"
                                            fieldId="board Title"
                                            title="Title"
                                            name="title"
                                            placeHolder="Ex: today todos checklist"
                                        />
                                    </div>
                                    <div class="flex items-center justify-between ">
                                        <label className='text-gray-100'>Methdology : </label>
                                        <select class="bg-black-100 appearance-none w-32 text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            value={board.select}
                                            // onChange={event => handleFormChange(event, index)}
                                            name="select"

                                        >
                                            <option>Scrum </option>
                                            <option>WaterFull</option>
                                            <option>Agile</option>
                                        </select>
                                    </div>

                                </div>
                            )
                        )}

                    </div>



                </div>


                {/*Members section*/}
                <div className="w-1/3 space-y-8 p-4">
                    <SectionTitle icon={<BsFillPersonLinesFill className="w-5 h-5 text-white" />} text="Members" />
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