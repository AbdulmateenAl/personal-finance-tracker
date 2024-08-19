import { forwardRef } from "react";

function AddNewCategory({ visible, onClose, titleRef, colorRef, AddExpense }) {
    
    return (
        <div
            style={{
                transform: visible ? "translateY(0%)" : "translateY(-200%)",
                transition: "transform 0.5s ease",
            }}
            className="flex flex-row items-center gap-2 p-4">
                <input name="title" ref={titleRef} className="" type="text" placeholder="Enter Title" required/>
                <p>Pick Color</p>
                <input className="p-2" ref={colorRef} name="color" type="color" required/>
                <div className="flex fle-row gap-2">
                    <button onClick={AddExpense} className="btn btn-primary-outline">Create</button>
                    <button onClick={() => onClose(false)} className="btn btn-danger">Cancel</button>
                </div>
            </div>
    )
}

export default AddNewCategory;