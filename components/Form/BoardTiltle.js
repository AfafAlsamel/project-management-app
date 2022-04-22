import React from 'react'

function BoardTiltle({iconn, textt}) {
    return (
        <div className="flex space-x-2 items-center ">
            {iconn}
            <p className="text-white">{textt}</p>
        </div>
    )
}

export default BoardTiltle