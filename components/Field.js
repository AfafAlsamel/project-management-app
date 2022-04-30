import React from 'react'

function Field({ fieldType, fieldId, title, placeHolder, fieldValue, fieldFunc,name }) {
    return (
        <div className="relative">
            <input
                type={fieldType}
                id={fieldId}
                value={fieldValue}
                onChange={fieldFunc}
                className="
                w-full 
                h-10
                bg-black-100 
                text-white
                placeholder-transparent
                border-b border-black-300 
                py-1 focus:outline-none 
                focus:border-gray-100 focus:border-b-1 
                text-lg
                peer
                "
                autocomplete="off"
                placeholder={placeHolder}
                name={name}
            />

            <label
                for={fieldId}
                className="
                absolute 
                left-0 
                -top-3.5  
                text-gray-100
                text-sm
                peer-placeholder-shown:text-lg peer-placeholder-shown:text-white peer-placeholder-shown:top-1 
                peer-focus:-top-3.5
                peer-focus:text-gray-100
                peer-focus:text-sm
                transition-all
                "
            >
                {title}
            </label>
        </div>
    )
}

export default Field