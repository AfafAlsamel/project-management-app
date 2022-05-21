import React, { useEffect, useRef, useState } from 'react'
import {
    PaperClipIcon,
    PlusIcon,
    UserGroupIcon,
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
    onSnapshot,
    arrayUnion,
} from "@firebase/firestore";

import { ref as sRef } from 'firebase/storage';


import Field from '../Field'
import SectionTitle from './SectionTitle';
import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getProjectsState, projectIdState, } from '../../atoms/projectAtoms';
import { boardState } from '../../atoms/boardAtoms';

function createGuidId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function Form({ columnIndex }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projectId, setProjectId] = useRecoilState(projectIdState);
    const [project, setProject] = useRecoilState(getProjectsState);
    const boardIndex = useRecoilValue(boardState) // use RecoilValue "project"
    const [tasksFields, setTasksFields] = useState({
                id: '',
                priority: '',
                title: '',
                details: '',
                date: '',
                attachment: '',
            
            
        });


    // const handleChange = (event, index) => {
    //     let data = [...tasksFields];
    //     data[index][event.target.name] = event.target.value;
    //     setTasksFields(data);
    // }

    const handleTaskChange = (e) => {
        const value = e.target.value;
        setTasksFields({
            ...tasksFields,
            [e.target.name]: value
        });
    }


    // useEffect(
    //     () => {
    //         // const pId = projectId ?? "";
    //         // if (pId.length == 0) {
    //         //     return
    //         // }

    //         return onSnapshot(doc(db, "projects", projectId), (doc) => {
    //             // setBoard(snapshot.data());
    //             console.log(doc.data().boards[boardIndex].columns[columnIndex].tasks);
    //             // setBoardData(Object.values(doc.data().boards[boardIndex].columns))

    //         });

    //     }
    //     , [db, projectId]

    // );


    const filePickerRef = useRef(null);
    const sendTask = async () => {


        if (loading) return;
        setLoading(true);

        let object = {
            id: createGuidId(),
            priority: tasksFields.priority,
            title: tasksFields.title,
            date: tasksFields.date,
            details: tasksFields.details,
            chat: '0',
            attachment: '0'
        }


        // console.log(object);
        // console.log(project);
        // console.log(projectId);





        const taskRef = doc(db, "projects", projectId ?? "1");
        
        const newBoard = {...project.boards};
        const newColumn = [...project.boards[boardIndex].columns];


        newColumn[columnIndex] = {
                ...newColumn[columnIndex],
                tasks: [...newColumn[columnIndex].tasks, object]
        
        };

        newBoard[boardIndex] = {...newBoard[boardIndex], columns: newColumn};

        // console.log(newColumn);
        // console.log(project.boards[boardIndex]);
        // console.log(newBoard);

        await updateDoc(taskRef, {

            ...project,
            boards: newBoard,

        });

        const fileRef = sRef(storage, `tasks/${taskRef.id}/file`);
        if (selectedFile) {
            await uploadString(fileRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(fileRef);
                await updateDoc(doc(db, "tasks", taskRef.id), {
                    file: downloadURL,
                });
            });
        }

        setLoading(false);
        setTasksFields(
            {
                id: '',
                priority: '',
                title: '',
                details: '',
                date: '',
                attachment: '',
            }
        )
        // setTasks({});
        setSelectedFile(null);

    };



    const addFileToTask = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };


    };





    return (
        <div className="space-y-4 divide-y divide-black-300 cursor-default">
              
                <div className="flex space-x-4 divide-x divide-black-300" >
                <div className="w-1/3 space-y-8 p-4">
                    <div className="space-y-4">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Task settings" />
                        <Field
                            fieldValue={tasksFields.title}
                            fieldFunc={(e) => handleTaskChange(e)}
                            fieldType="text"
                            fieldId="Task title"
                            title="Task title"
                            placeHolder="Ex: today todos checklist"
                            name="title"
                        />


                        <Field
                            fieldValue={tasksFields.date}
                            fieldFunc={(e) => handleTaskChange(e)}
                            fieldType="date"
                            fieldId="Date"
                            title="Date"
                            name="date"
                        />
                        <div class="flex items-center justify-between ">
                            <label className='text-gray-100'>Priority : </label>
                            <select class="bg-black-100 appearance-none w-30 text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                value={tasksFields.select}
                                onChange={(e) => handleTaskChange(e)}
                                name="select"  >
                                <option>High</option>
                                <option>medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <SectionTitle icon={<UserGroupIcon className="w-5 h-5 text-white" />} text="Assigned to" />
                        <ul className="flex space-x-3">
                            <li>
                                <div className=" bg-gray-100 justify-center items-center w-9 h-9 rounded ">
                                    <h6>L</h6>
                                </div>
                            </li>

                            <li>
                                <button
                                    className="border flex items-center w-9 h-9 border-gray-100 justify-center rounded"
                                >
                                    <PlusIcon className="w-5 h-5 text-white" />
                                </button>
                            </li>
                        </ul>
                    </div>


                    {/* Section */}

                    <div>

                        <div className="flex justify-between items-center">
                            <SectionTitle
                                icon={<PaperClipIcon className="w-5 h-5 text-white" />}
                                text="Attachments"
                            />
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => filePickerRef.current.click()}
                            >
                                <PlusIcon className="w-5 h-5 text-gray-100" />
                                <input
                                    type="file"
                                    hidden
                                    onChange={addFileToTask}
                                    ref={filePickerRef}>
                                </input>
                                <p className="text-gray-100">Add</p>
                            </div>
                        </div>

                        {selectedFile && (
                            <div id="form-file-text" className="bg-black-300 py-1 px-4 rounded mt-2 text-gray-100 flex">
                                <div onClick={() => setSelectedFile(null)}>
                                    <div src={selectedFile}> </div>
                                    <XIcon className="w-5 h-5 text-gray-100" />
                                </div>
                            </div>
                        )}


                    </div>


                </div>
                <div className="w-full box-border overflow-auto divide-y divide-black-300 p-4 space-y-4">


                    <div className=" bg-gray-100 justify-center items-center w-9 h-9 rounded ">
                        <h6>L</h6>
                    </div>



                    <div>
                        <textarea
                            value={tasksFields.details}
                            onChange={(e) => handleTaskChange(e)}
                            rows="20"
                            placeholder="Add tasks details"
                            className="bg-transparent outline-none text-white text-lg tracking-wide w-full max-h-[500px] min-h-[50px]"
                            name="details"
                        >

                        </textarea>
                    </div>


                </div>
                </div>
  

          

            <div className="pt-4">
                <button
                    className="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default"

                    onClick={sendTask}

                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Form