import React from 'react'
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import {
    PlusIcon,
    DotsVerticalIcon,
    PlusCircleIcon,
} from "@heroicons/react/outline";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import CardItem from "../components/CardItem";
import BoardData from "../data/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import Form from "../components/Form/TaskForm";
import Modal from "../components/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, modalType, modalTypeState } from "../atoms/modalAtoms";
import { getBoardsState, projectIdState } from '../atoms/projectAtoms';
import { boardState } from '../atoms/boardAtoms';
import { db } from "../firebase";



function createGuidId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



function Board({ }) {


    const [projectId, setProjectId] = useRecoilState(projectIdState);
    const boardIndex = useRecoilValue(boardState) // use RecoilValue "project"




    useEffect(
        () => {
            const pId = projectId ?? "";
            if (pId.length == 0) {
                return
            }

            return onSnapshot(doc(db, "projects", projectId), (doc) => {
                // setBoard(snapshot.data());
                // console.log(Object.values(doc.data().boards[boardIndex].columns));
                setBoardData(Object.values(doc.data().boards[boardIndex].columns))

            });

        }
        , [db, projectId]

    );







    // const board = useRecoilValue(getBoardsState);

    const [ready, setReady] = useState(false);

    // const [boardData, setBoardData] = useRecoilState(boardState); // use RecoilValue "project"
    const [boardData, setBoardData] = useState([]);
    // const [boardData, setBoardData] = useRecoilState(boardState) // use RecoilValue "project"


    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);
    const [columnIndex, setcolumnIndex] = useState("");



    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [modalType, setModalType] = useRecoilState(modalTypeState)


    useEffect(() => {
        if (process.browser) {
            setReady(true);

        }

        // console.log(boardData[columnIndexx].columns);
        // console.log(boardData[0].columns)


    }, []);

    const onDragEnd = (re) => {
        if (!re.destination) return;
        let newBoardData = boardData;
        var dragItem =
            newBoardData[parseInt(re.source?.droppableId)]?.items[re.source?.index];
        newBoardData[parseInt(re.source.droppableId)]?.items.splice(
            re.source.index,
            1
        );
        newBoardData[parseInt(re.destination.droppableId)].items?.splice(
            re?.destination.index,
            0,
            dragItem
        );
        setBoardData(newBoardData);
    };

    const onTextAreaKeyPress = (e) => {

        setModalOpen(true);
        setModalType("dropIn");

        const val = e.target.value;


        const columnId = selectedColumn;
        const item = {
            id: createGuidId(),
            title: val,
            priority: 0,
            chat: 0,
            attachment: 0,
            assignees: []
        }
        let newColumnData = boardData;
        newColumnData[columnId].items.push(item);
        setBoardData(newColumnData);
        setModalOpen(false);
        // setShowForm(false);
        e.target.value = '';

    }

    return (
        <div className="p-10 flex flex-col h-screen">
            {/* Board header */}
            <div className="flex flex-initial justify-between">
                <div className="flex items-center">
                    <h4 className="text-4xl font-bold text-gray-100">Kanban board</h4>
                </div>
            
            </div>

            {/* Board columns */}
            {ready && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-4 gap-5 my-5">
                    {boardData?.map((column,cIndex) =>

                                <div key={column.cIndex}>
                                    {/* <p>{board.columns.name}</p> */}
                                    <Droppable droppableId={cIndex.toString()}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                <div
                                                    className={`bg-black-100 rounded-md shadow-md
                              flex flex-col relative overflow-hidden w-64
                              ${snapshot.isDraggingOver && "bg-black-200"}`}
                                                >

                                                    <h4 className=" p-3 flex justify-between items-center mb-2">
                                                        <span className="text-2xl text-white">

                                                            {column.name}
                                                        </span>
                                                        <DotsVerticalIcon className="w-5 h-5 text-gray-100" />
                                                    </h4>

                                                    <div className="overflow-y-auto overflow-x-hidden h-auto"
                                                        style={{ maxHeight: 'calc(100vh - 290px)' }}>
                                                        {column.tasks?.length > 0 &&
                                                            column.tasks.map((item, iIndex) => {
                                                                return (
                                                                    <CardItem
                                                                        key={item.id}
                                                                        data={item}
                                                                        index={iIndex}
                                                                        className="m-3"
                                                                    />
                                                                );
                                                            })}
                                                        {provided.placeholder}
                                                    </div>


                                                    <button
                                                        className="flex justify-center items-center my-3 space-x-2 text-lg"
                                                        // data-id={cIndex}
                                                        onClick={() => {
                                                            setcolumnIndex(cIndex);
                                                            setSelectedBoard(cIndex);
                                                            setModalOpen(true);
                                                            setModalType("dropIn");
                                                        }}
                                                    >
                                                        <span className="text-gray-100">Add task</span>
                                                        <PlusCircleIcon className="w-5 h-5 text-gray-100" />
                                                    </button>



                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>


                            )


                        }
                    </div>
                </DragDropContext>
            )}

            {
                <AnimatePresence>
                    {modalOpen && (
                        <Modal handleClose={() => setModalOpen(false)} type={modalType} comp={<Form columnIndex={columnIndex} />} />
                    )}
                </AnimatePresence>
            }
        </div>
    )
}

export default Board