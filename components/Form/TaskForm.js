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

function Form() {
    const { data: session } = useSession();

    const [taskDetails, setTaskDetails] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");


    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);

    const sendTask = async () => {
        if (loading) return;
        setLoading(true);

        // const docRef = await addDoc(collection(db, "tasks"), {
        //     id: session.user.uid,
        //     username: session.user.name,
        //     userImg: session.user.image,
        //     tag: session.user.tag,
        //     title: taskTitle,
        //     date: taskDate,
        //     details: taskDetails,
        //     timestamp: serverTimestamp(),
        // });


        const docRef = await updateDoc(collection(db, "projects", "boards"), {

            tasks: [{
                id: session.user.uid,
                username: session.user.name,
                userImg: session.user.image,
                tag: session.user.tag,
                title: taskTitle,
                date: taskDate,
                details: taskDetails,
                timestamp: serverTimestamp(),
            }]
        });


        //    const docRef = await db.collection("projects");
        //     docRef.update({

        //         boards:

        //     })
        //    {
        //     id: session.user.uid,
        //     username: session.user.name,
        //     userImg: session.user.image,
        //     tag: session.user.tag,
        //     title: taskTitle,
        //     date: taskDate,
        //     details: taskDetails,
        //     timestamp: serverTimestamp(),
        // });



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
        setTaskTitle("");
        setTaskDate("");
        setTaskDetails("");
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
        <div className="space-y-4 divide-y divide-black-300">
            <div className="flex space-x-4 divide-x divide-black-300">
                <div className="w-1/3 space-y-8 p-4">

                    <div className="space-y-4">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Task settings" />
                        <Field
                            fieldValue={taskTitle}
                            fieldFunc={(e) => setTaskTitle(e.target.value)}
                            fieldType="text"
                            fieldId="Task title"
                            title="Task title"
                            placeHolder="Ex: today todos checklist"
                        />


                        <Field
                            fieldValue={taskDate}
                            fieldFunc={(e) => setTaskDate(e.target.value)}
                            fieldType="date"
                            fieldId="Date"
                            title="Date"
                        />
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
                            value={taskDetails}
                            onChange={(e) => setTaskDetails(e.target.value)}
                            rows="20"
                            placeholder="Add tasks details"
                            className="bg-transparent outline-none text-white text-lg tracking-wide w-full max-h-[500px] min-h-[50px]">

                        </textarea>
                    </div>


                </div>
            </div>

            <div className="pt-4">
                <button
                    className="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default"
                    disabled={!taskDetails.trim() && !selectedFile}
                    onClick={sendTask}

                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Form