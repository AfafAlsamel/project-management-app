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
import { useRecoilState, useRecoilValue } from "recoil";
import { getProjectsState, isNewProject } from '../../atoms/projectAtoms';
import Boards from './Boards';

function CreateProject() {

    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(false)
    const project = useRecoilValue(getProjectsState);
    const [projectt, editProject] = useRecoilState(getProjectsState);
    const isNew = useRecoilValue(isNewProject);
    const [email, setemail] = useState('');
    const [boardFields, setboardFields] = useState([
        {
            title: '',
            type: '',
            columns: [
                {
                    name: "backlog",
                    tasks: [],

                },
                {
                    name: "In progress",
                    tasks: [],

                },
                {
                    name: "In review",
                    tasks: [],

                }
            ]

        },
    ]);


    const [projectFields, setProjectFields] = useState({
        title: '',
        details: '',
        date: '',
    });

    function handleChange(e) {
        const value = e.target.value;
        setProjectFields({
            ...projectFields,
            [e.target.name]: value
        });
    }
   


    const sendProject = async () => {
        console.log(projectFields)
        console.log(projectFields.title)
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "projects"), {
            id: session.user.uid,
            projectDetails: projectFields,
            boards: boardFields,
            timestamp: serverTimestamp(),
        });


        setLoading(false);
        setProjectFields({
            title: '',
            details: '',
            date: '',
        })
        setboardFields({
            title: '',
            type: '',
            columns: [{}]

        })


    };


    // const updateProject = async () => {

    //     if (loading) return;
    //     setLoading(true);
    //     const docRef = await updateDoc(collection(db, "projects"), {
    //         projectDetails: projectFields,
    //         boards: boardFields,
    //         timestamp: serverTimestamp(),
    //     });

    //     // const dbInstance = collection(db, `projects/${docRef.id}/board`);


    //     setLoading(false);
    //     setProjectFields({
    //         title: '',
    //         details: '',
    //         date: '',
    //     })
    //     setboardFields({
    //         title: '',
    //         type: '',
    //         columns: {
    //             name: "backlog",
    //             tasks: [
    // {
    //     "id": 1,
    //     "priority": "high",
    //     "title": "Company website redesign.",
    //     "date":"10-5-20",
    //     "details": "details",
    //     "chat": 10,
    //     "attachment": 4,

    // },

    //             ]
    //         }
    //     })

    // };


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




    const handleBoardChange = (event, index) => {
        let data = [...boardFields];
        data[index][event.target.name] = event.target.value;
        setboardFields(data);
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(boardFields)
        console.log(projectFields)


    }

    const addBoard = () => {
        let object = {
            title: '',
            type: '',

            columns: [
                {
                    name: "backlog",
                    tasks: [],

                },
                {
                    name: "In progress",
                    tasks: [],

                },
                {
                    name: "In review",
                    tasks: [],
                }
            ]
        };

        setboardFields([...boardFields, object])
    }
    const handleClick = (e) => {
        e.preventDefault()
        if(e.target.value) {
            setList(!list)
        }
        setList(!list)
        setemail('');
    
    }

    return (
        <div className="space-y-4 divide-y divide-black-300 cursor-default">
            <div className="flex space-x-4 divide-x divide-black-300">

                {/*Project section*/}

                {/* <form onSubmit={submit}> */}
                <div className="w-1/3 space-y-8 p-5">
                    <div className="space-y-9 cursor-default">
                        <SectionTitle icon={<CogIcon className="w-5 h-5 text-white" />} text="Project settings" />
                        <Field
                            fieldValue={isNew ? projectFields.title : project.projectDetails.title}
                            fieldFunc={(e) => handleChange(e)}
                            fieldType="text"
                            fieldId="project title"
                            title="project title"
                            placeHolder="Ex: today todos checklist"
                            name="title"
                        />

                        <div><label className='text-sm text-gray-100 cursor-default'>Description </label>
                            <textarea
                                value={isNew ? projectFields.details : project.projectDetails.details}
                                onChange={(e) => handleChange(e)}
                                title="Des"
                                placeholder="Add project details"
                                className="bg-transparent border-b border-black-300 outline-none text-white text-lg tracking-wide w-full max-h-[500px] min-h-[50px]"
                                name="details"
                            >
                            </textarea>
                        </div>

                        <Field
                            fieldValue={isNew ? projectFields.date : project.projectDetails.date}
                            fieldFunc={(e) => handleChange(e)}
                            fieldType="date"
                            fieldId="Date"
                            title="Duration"
                            name="date"
                        />
                    </div>
                </div>
                {/* </form> */}


                {/*Board section*/}
                <div className=" justify-between items-center overflow-auto w-1/3 divide-black-300 p-4 space-y-4">
                    <div className="flex justify-between">
                        <SectionTitle icon={<MdOutlineSpaceDashboard className="w-5 h-5 text-white" />} text="Boards" />
                        <button className='flex items-center cursor-pointer text-gray-100 '
                            onClick={addBoard} >
                            <PlusIcon className="w-5 h-5 text-gray-100" />
                            Add Boards
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
                                                    <h2 className='text-white font-bold cursor-default'>New board</h2>
                                                    <button class="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default" type="button"
                                                        onClick={submit} >Save</button>
                                                </div>
                                                <Field
                                                    fieldValue={board.name}
                                                    fieldFunc={event => handleBoardChange(event, index)}
                                                    fieldType="text"
                                                    fieldId="board Title"
                                                    title="Title"
                                                    name="title"
                                                    placeHolder="Ex: today todos checklist"
                                                />
                                            </div>
                                            <div class="flex items-center justify-between ">
                                                <label className='text-gray-100'>Methdology : </label>
                                                <select class="bg-black-100 cursor-pointer appearance-none w-32 text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                    value={board.select}
                                                    onChange={event => handleBoardChange(event, index)}
                                                    name="select"

                                                >
                                                    <option value="" selected disabled hidden>Select</option>
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
                                            // fieldFunc={event => handleBoardChange(event, index)}
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
                                            // onChange={event => handleBoardChange(event, index)}
                                            name="select"

                                        >
                                            <option value="" selected disabled hidden>Select</option>
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
                    <div className="flex justify-between">
                        <SectionTitle icon={<BsFillPersonLinesFill className="w-5 h-5 text-white" />} text="Members" />
                        <button className='flex items-center cursor-pointer text-gray-100 '
                        >
                            <PlusIcon className="w-5 h-5 text-gray-100" />
                            Add Members
                        </button>
                    </div>

                    <div className="w-full space-y-5 p-4 border border-black-300  rounded">
                        <div className="space-y-3">
                            <div class="flex items-center justify-between">
                                <h2 className='text-white font-bold cursor-default'>Invite </h2>
                                <button class="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default" type="button"
                                onClick = {handleClick}>Send</button>
                            </div>
                            <Field
                                fieldValue={email}
                                fieldFunc={event => setemail(event.target.value)}
                                fieldType="text"
                                fieldId="board Title"
                                title="Enter email"
                                name="title"
                                placeHolder="EX : "
                            />
                        </div>
                    </div>
                    {list ?   
                          <div className="w-full space-y-5 p-4 border border-black-300 rounded"> 
                             <div className="space-y-3">
                            <div class="flex items-center  justify-between">
                                <h2 className='text-white font-bold cursor-default'>Invite send Sucsessfuly </h2>
                                </div>
                                </div>
                             </div> :  ' ' }
                           
                </div>
            </div>

            <div className="pt-4">
                <button
                    className="bg-primary text-white rounded px-4 py-1.5 font-bold shadow-md hover:bg-primary-dark disabled:hover:bg-black-300 disabled:opacity-50 disabled:cursor-default"
                    disabled={!projectFields.title.trim()}
                    onClick={sendProject} >
                    Save project
                </button>
            </div>

        </div>

    );
}

export default CreateProject