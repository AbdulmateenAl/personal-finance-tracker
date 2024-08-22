import { useRef, useState, useContext } from 'react';
import { financeContext } from '../lib/store/finance-context';

import Modal from '../components/Modal';
import { currencyFormatter } from '../lib/utils';

function AddExpenseModal({show, onClose}){

    const [showNewCategory, setShowNewCategory] = useState(false);
    const [clickedExpense, setClickedExpense] = useState();
    // const totalRef = useRef();
    const [expenseTotal, setExpenseTotal] = useState();
    const colorRef = useRef();
    const titleRef = useRef();
    const { expenses, addExpenseItem } = useContext(financeContext);

    const addExpenseHandler = async (e) => {
        e.preventDefault();
        const currentTimeStamp = new Date();
        const newExpenses = {
            color: colorRef.current.value,
            title: titleRef.current.value,
            total: +expenseTotal,
        }

        try {
            await addExpenseItem(newExpenses);
            colorRef.current.value = '';
            titleRef.current.value = '';

        } catch (error) {
            console.error(error);
        }
    }

    const addExpense = (expense_id) => {
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === expense_id) {
                expenses.total =+ expenseTotal;
            }
        }
    }
    
    return (
        <Modal show={show} onClose={onClose}>
            <div>
                <div className='py-2'>
                    <p>Enter an amount, and then select a category...</p>
                </div>
                <div className='py-2'>
                    <input onChange={(e) => setExpenseTotal(e.target.value)} className='w-full' type='number' placeholder='Enter expense amount' min={0.01} step={0.01} required/>
                </div>
                {expenseTotal > 0 && (
                    <div>
                        <div className='flex flex-row justify-between py-5'>
                            <h2 className='text-xl'>Select Expense Category</h2>
                            <button onClick={() => setShowNewCategory(true)} className='btn text-lime-500'>+ New Category</button>
                        </div>
                        {showNewCategory && (
                            <div className="flex flex-row items-center gap-2 p-3">
                                <input name="title" ref={titleRef} className="" type="text" placeholder="Enter Title" required/>
                                <p>Pick Color</p>
                                <input className="p-2" ref={colorRef} name="color" type="color" required/>
                                <div className="flex fle-row gap-2">
                                    <button onClick={addExpenseHandler} className="btn btn-primary-outline">Create</button>
                                    <button onClick={() => setShowNewCategory(false)} className="btn btn-danger">Cancel</button>
                                </div>
                            </div>
                        )}
                        <div className='flex flex-col gap-3 w-full mt-3'>
                            {expenses.map((expense) => {
                                return (
                                    <button onClick={() => setClickedExpense(expense.id)} key={expense.id} className='w-full'>
                                        <div className='flex items-center justify-between p-4 w-full bg-slate-700 rounded-3xl' style={{ boxShadow: (clickedExpense === expense.id) ? "1px 1px 4px" : "none" }}>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-[25px] h-[25px] rounded-full ' style={{ background: expense.color }}/>
                                                <h4>{expense.title}</h4>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                            {clickedExpense && (
                                <button onClick={() => addExpense(clickedExpense)} className='btn btn-primary'>Add Expense</button>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </Modal>
    )
}

export default AddExpenseModal;