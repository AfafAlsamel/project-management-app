import React from 'react'

function MemberTitle({icone, texte}) {
    return (
        <div className="flex space-x-2 items-center ">
            {icone}
            <p className="text-white">{texte}</p>
        </div>
    )
}

export default MemberTitle