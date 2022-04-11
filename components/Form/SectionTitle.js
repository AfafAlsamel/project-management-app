import React from 'react'

function SectionTitle({icon, text}) {
    return (
        <div className="flex space-x-2 items-center ">
            {icon}
            <p className="text-white">{text}</p>
        </div>
    )
}

export default SectionTitle