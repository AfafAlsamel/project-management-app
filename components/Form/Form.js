import React, { useRef, useState } from 'react'
import Field from './Field'

import {
    PaperClipIcon,
    PlusIcon,
    UserGroupIcon,
    CogIcon,
    XIcon,
} from "@heroicons/react/outline";
import SectionTitle from './SectionTitle';

function Form({ data }) {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);
    }

    const addFile = () => { };


    return (
        <div className="space-y-4 divide-y divide-black-300">
            <div className="flex space-x-4 divide-x divide-black-300">
                <div className="w-1/3 space-y-8 p-4">

                    <div className="space-y-4">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Task settings" />
                        <Field fieldType="text" id="Task title" title="Task title" placeHolder="Ex: today todos checklist" />
                        <Field fieldType="date" id="Date" title="Date" />
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
                                    onChange={addFile}
                                    ref={filePickerRef}>
                                </input>
                                <p className="text-gray-100">Add</p>
                            </div>
                        </div>

                        {selectedFile && (
                            <div className="bg-black-300 py-1 px-4 rounded mt-2 text-gray-100 flex">
                                <p>{selectedFile.name}</p>
                                <div onClick={() => setSelectedFile(null)}>
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
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
                    disabled={!input.trim() && !selectedFile}

                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Form