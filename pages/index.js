import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import Image from "next/dist/client/image";
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import CardItem from "../components/CardItem";
import BoardData from "../data/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import Form from "../components/Form/TaskForm";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState, modalType, modalTypeState } from "../atoms/projectAtomss";



function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);


  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)





  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) //Enter
    {
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      }
      else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: []
        }
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  return (
    <Layout>
      <div className="p-10 flex flex-col h-screen">
        {/* Board header */}
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-100">Kanban board</h4>
          </div>

          <ul className="flex space-x-3">
            <li>
              <Image
                src="https://randomuser.me/api/portraits/men/75.jpg"
                width="36"
                height="36"
                objectFit="cover"
                className=" rounded-full "
              />
            </li>
            <li>
              <Image
                src="https://randomuser.me/api/portraits/men/76.jpg"
                width="36"
                height="36"
                objectFit="cover"
                className=" rounded-full "
              />
            </li>
            <li>
              <Image
                src="https://randomuser.me/api/portraits/men/78.jpg"
                width="36"
                height="36"
                objectFit="cover"
                className=" rounded-full "
              />
            </li>
            <li>
              <button
                className="border border-dashed flex items-center w-9 h-9 border-gray-100 justify-center
                rounded-full"
              >
                <PlusIcon className="w-5 h-5 text-gray-100" />
              </button>
            </li>
          </ul>
        </div>

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-5 my-5">
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`bg-black-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-black-200"}`}
                          >

                            <h4 className=" p-3 flex justify-between items-center mb-2">
                              <span className="text-2xl text-white">
                                {board.name}
                              </span>
                              <DotsVerticalIcon className="w-5 h-5 text-gray-100" />
                            </h4>

                            <div className="overflow-y-auto overflow-x-hidden h-auto"
                              style={{ maxHeight: 'calc(100vh - 290px)' }}>
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
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

                            {
                              selectedBoard === bIndex ? (
                                <div className="p-3">
                                  <textarea className="border-gray-100 rounded  w-full"
                                    rows={3} placeholder="Task info"
                                    data-id={bIndex}
                                    onKeyDown={(e) => onTextAreaKeyPress(e)} />
                                </div>
                              ) : (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => { setSelectedBoard(bIndex); setModalOpen(true); setModalType("dropIn"); }}
                                >
                                  <span className="text-gray-100">Add task</span>
                                  <PlusCircleIcon className="w-5 h-5 text-gray-100" />
                                </button>


                              )
                            }

                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}

        {
          <AnimatePresence>
            {modalOpen && (
              <Modal handleClose={() => setModalOpen(false)} type={modalType} comp={<Form/>}/>
            )}
          </AnimatePresence>
        }
      </div>
    </Layout>
  );
}
