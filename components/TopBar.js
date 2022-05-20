import React from 'react';
import { SearchIcon, AtSymbolIcon, BellIcon, LogoutIcon } from '@heroicons/react/outline';
function TopBar({ userName, userNameTag, userImage, func }) {
    return (
        <div className="h-16 pl-40 bg-black-200 border-2 border-b-black-300 w-full flex items-center 
        justify-between pr-5">
            <div className="flex px-10 items-center">
                <SearchIcon className="w-5 h-5 text-white" />
                <input type="text" placeholder="Search for tasks ..."
                    className=" bg-black-200 border-0 text-white placeholder-gray-100
                outline-none focus:ring-0 text-lg"/>
            </div>
            <div className="flex space-x-6 items-center">
                <AtSymbolIcon className="w-7 h-7 text-white" />
                <LogoutIcon onClick={func} className="w-7 h-7 text-white cursor-pointer" />

                <div className="flex items-center text-white">
                    <div className="flex flex-col">
                        <h3 className="font-bold mr-3">{userName}</h3>
                        <h3 className="font-light mr-3">@{userNameTag}</h3>
                    </div>
                    <img src={userImage}
                        width="36"
                        height="36"
                        objectFit="cover"
                        className=" rounded " />
                </div>
            </div>
        </div>
    );
}
export default TopBar;