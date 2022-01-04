import React, { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside'
// import { CloseIcon } from './Icons'
import './Modal.css'

function Modal({modalOpen,setModalOpen,...props}) {
    const ref = useRef(null)
    
    useOnClickOutside(ref,()=> setModalOpen(false))

    return (
        
        <div  className={`h-100 z-20 position-fixed left-0 w-100 top-0 bg-opacity-20 bg-gray-500 ${modalOpen? "":"d-none"}`}>
            <div  ref={ref} className={"absolute-center width bg-gray-200 shadow-md p-3 rounded-md"}>
 
                <div>
                    {props.children}
                </div>
                
                <div  className="text-center">
                    <button onClick={()=> setModalOpen(false)} className="btn btn-Collect more-btn">
                        CANCEL
                    </button>
                </div>
               
            </div>
        </div>
       
    )
}

export default Modal
