import React, { useRef, useState } from 'react'

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
} from "@firebase/firestore";

import Field from '../Field'
import SectionTitle from './SectionTitle';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { projectIdState } from '../../atoms/projectAtoms';

function Form({ bIndex, selectedColumn }) {
    const { data: session } = useSession();

<<<<<<< HEAD
    const [taskDetails, setTaskDetails] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskPriority, setTaskPriority] =useState("");

=======
>>>>>>> ac4b95f4109a6c14f675a6d08927b68f86832d2d
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [projectId, setProjectId] = useRecoilState(projectIdState);

    const [taskFields, setTaskFields] = useState({
        id: '',
        priority: '0',
        title: '',
        details: '',
        date: '',
        attachment: '0',

    })

    function handleChange(e) {
        const value = e.target.value;


        setTaskFields({
            ...taskFields,
            [e.target.name]: value
        });
    }

    const filePickerRef = useRef(null);

    const sendTask = async () => {
        if (loading) return;
        setLoading(true);

        // const docRef = await updateDoc(collection(db, "projects", projectId, "boards", bIndex, "columns", selectedColumn), {

        // const docRef = await updateDoc(collection(db, "projects",projectId, "boards", bIndex), {

        const taskRef = await db.collection("projects").doc(projectId);
        // taskRef.whereArrayContains("boards", Dev board).get()
        taskRef.push({
            

            columns: {
                name: 'backlog',
                tasks: {
                    priority: '0',
                    title: taskFields.title,
                    date: taskFields.date,
                    details: taskFields.details,
                    attachment: '0'
                }
            }
        });




        const fileRef = ref(storage, `tasks/${docRef.id}/file`);


        if (selectedFile) {
            await uploadString(fileRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(fileRef);
                await updateDoc(doc(db, "tasks", docRef.id), {
                    file: downloadURL,
                });
            });
        }

        setLoading(false);
        setTaskFields(
            {
                id: '',
                priority: '0',
                title: '',
                details: '',
                date: '',
                attachment: '0',
            }
        )

        setSelectedFile(null);
        setTaskPriority("");
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
            <div className="flex space-x-4 divide-x divide-black-300">
                <div className="w-1/3 space-y-8 p-4">

                    <div className="space-y-4">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Task settings" />
                        <Field
                            fieldValue={taskFields.title}
                            fieldFunc={(e) => handleChange(e)}
                            fieldType="text"
                            fieldId="Task title"
                            title="Task title"
                            placeHolder="Ex: today todos checklist"
                            name="title"
                        />


                        <Field
                            fieldValue={taskFields.date}
                            fieldFunc={(e) => handleChange(e)}
                            fieldType="date"
                            fieldId="Date"
                            title="Date"
                            name="date"
                        />
                         <div class="flex items-center justify-between ">
                        <label className='text-gray-100'>Priority : </label>
                        <select class="bg-black-100 appearance-none w-30 text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            name="select"  >
                                <option>High </option>
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
                            value={taskFields.details}
                            onChange={(e) => handleChange(e)}
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
                    disabled={!taskFields.details.trim() && !selectedFile}
                    onClick={sendTask}

                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Form