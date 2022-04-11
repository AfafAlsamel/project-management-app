import React from 'react'
import Field from './Field'

import {
    PaperClipIcon,
    PlusIcon,
    UserGroupIcon,
    CogIcon,
} from "@heroicons/react/outline";
import SectionTitle from './SectionTitle';

function Form({ data }) {
    return (
        <div className="flex space-x-4">
            <div className="w-1/3 space-y-8 pr-4 border-r border-black-300 ">

                <div className="space-y-4 ">
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

                <div className="space-y-4">
                    <SectionTitle icon={<PaperClipIcon className="w-5 h-5 text-white" />} text="Attachments" />
                </div>


            </div>
            <div className="w-full box-border overflow-auto">

                <div className="border-b border-black-300 pb-4 ">

                    <div className=" bg-gray-100 justify-center items-center w-9 h-9 rounded ">
                        <h6>L</h6>
                    </div>
                </div>

               <div contenteditable="true" placeholder="I look like a textarea" className="h-full text-white placeholder-color-black">

               </div>

            </div>
        </div>
    )
}

export default Form