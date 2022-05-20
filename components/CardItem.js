import React from "react";
import Image from "next/dist/client/image";
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  ChatAltIcon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Draggable } from "react-beautiful-dnd";


import Chip from "./chip";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtoms";

function CardItem({ data, index }) {

  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-black-300 rounded-md p-4 m-3 mt-0 last:mb-0"
        >


          <h5 className="my-3 text-left text-lg leading-6 text-white">{data.title}</h5>


          <div className="flex-col space-y-4 justify-between">
            <div className="flex space-x-2 items-center">
              <div
                className={`px-2 py-1 rounded text-white text-sm
              ${data.priority === 0
                    ? "bg-black-400"
                    : data.priority === 1
                      ? "bg-black-400"
                      : "bg-black-400"
                  }
              `}
              >
                {data.priority === 0
                  ? "Low"
                  : data.priority === 1
                    ? "Medium"
                    : "High"}
              </div>
              <Chip icon={<ChatAltIcon className="w-4 h-4 text-white" />} title={data.chat} />
              <div className="flex px-2 py-1 rounded bg-black-400 space-x-1 items-center">
                <ChatAltIcon className="w-4 h-4 text-white" />
                <label className="text-white">{data.chat}</label>
              </div>
              <div className="flex flex px-2 py-1 rounded bg-black-400 space-x-1 items-center">
                <PaperClipIcon className="w-4 h-4 text-white" />
                <label className="text-white">{data.attachment}</label>
              </div>
            </div>
          </div>
        </div>


      )}
    </Draggable>
  );
}

export default CardItem;
