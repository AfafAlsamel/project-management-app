import React from 'react'

function Chip({icon, number}) {
    return (
        <div className="flex px-2 py-1 rounded bg-black-400 space-x-1 items-center">
            {icon}
            <label className="text-white">{number}</label>
        </div>
    )
}

export default Chip