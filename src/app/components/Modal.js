import { useState } from 'react';
function Modal({show, onClose, children }) {
    return (
        <div 
            style={{
                transform: show ? "translateX(0%)" : "translateX(-200%)",
            }} 
            className='absolute w-full h-full top-0 left-0 z-10 transition-all duration-500'>
            <div className='container mx-auto max-w-2xl h-[90vh] rounded-3xl bg-slate-800 py-6 px-4'>
                <button onClick={() => {onClose(false)}} className='w-10 h-10 mb-4 bg-slate-600 font-bold rounded-full'>x</button>
                {children}
            </div>
        </div>
    )
}
export default Modal;