import { useRef, useState, useContext } from 'react';
import { financeContext } from '../lib/store/finance-context';

import Modal from '../components/Modal';
import { currencyFormatter } from '../lib/utils';

import { v4 as uuidv4 } from 'uuid';

function AddExpenseModal({show, onClose}){

    const [showNewCategory, setShowNewCategory] = useState(false);
    const [clickedExpense, setClickedExpense] = useState(null);
    // const totalRef = useRef();
    const [expenseAmount, setExpenseAmount] = useState("");
    const colorRef = useRef();
    const titleRef = useRef();
    const { expenses, addExpenseItem, updateExpenseItem } = useContext(financeContext);

    const addExpenseHandler = async (e) => {
        e.preventDefault();
        const currentTimeStamp = new Date();
        const newExpenses = {
            color: colorRef.current.value,
            title: titleRef.current.value,
            total: 0,
            items: [],
        }

        try {
            await addExpenseItem(newExpenses);
            colorRef.current.value = '';
            titleRef.current.value = '';

        } catch (error) {
            console.error(error);
        }
    }

    const addExpense = () => {
        const expense = expenses.find(e => {
            return e.id === clickedExpense;
        });

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date().toLocaleDateString(),
                    id: uuidv4(),
                }
            ]
        }
        try {
            updateExpenseItem( clickedExpense, newExpense);
            setExpenseAmount("");
            setShowNewCategory(null);
            onClose();
        } catch (error) {
            throw error;
        }
    };
    
    return (
        <Modal show={show} onClose={onClose}>
            <div>
                <div className='py-2'>
                    <p>Enter an amount, and then select a category...</p>
                </div>
                <div className='py-2'>
                    <input onChange={(e) => setExpenseAmount(e.target.value)} className='w-full' type='number' value={expenseAmount} placeholder='Enter expense amount' min={0.01} step={0.01} required/>
                </div>
                {expenseAmount > 0 && (
                    <div>
                        <div className='flex flex-row justify-between py-5'>
                            <h2 className='text-xl'>Select Expense Category</h2>
                            <button onClick={() => setShowNewCategory(true)} className='btn text-lime-500'>+ New Category</button>
                        </div>
                        {showNewCategory && (
                            <div className="flex flex-row items-center gap-2 p-3">
                                <input name="title" ref={titleRef} className="" type="text" placeholder="Enter Title" required/>
                                <p>Pick Color</p>
                                <input className="w-24 h-10 p-2" ref={colorRef} name="color" type="color" required/>
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
                            {expenseAmount > 0 && clickedExpense && (
                                <button onClick={() => addExpense()} className='btn btn-primary'>Add Expense</button>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </Modal>
    )
}

export default AddExpenseModal;