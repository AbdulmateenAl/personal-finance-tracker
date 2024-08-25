import { useState,useContext } from 'react';
import Modal from '../components/Modal';

import { financeContext } from '../lib/store/finance-context';

import { currencyFormatter } from '../lib/utils';

import { MdDeleteOutline } from "react-icons/md";

function ViewExpense({show, onClose, expense}) {
    const [expenseId, setExpenseId] = useState();
    const { removeExpenseCategory, removeExpenseItem } = useContext(financeContext);

    const deleteExpense = async (expenseId) => {
        try {
            removeExpenseCategory(expenseId)
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (item) => {
        try {
            const updatedItems = expense.items.filter((i) => i.id !== item.id);
            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total -items.amount,
            };
        } catch (error) {
            throw error;
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
                    <div  className='flex flex-col gap-4'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-4xl'>{expense.title}</h1>
                            <button onClick={() => {deleteExpense(expense.id)}} className='btn btn-danger'>Delete</button>
                        </div>
                        <div>
                            <h3 className='text-2xl'>Expense History</h3>
                        </div>
                        {expense.items.map((e) => {
                            return (
                                <div key={e.id} className='flex flex-row justify-between'>
                                    <p>{e.createdAt}</p>
                                    <div className='flex flex-row items-center gap-2'>
                                        <p>{currencyFormatter(e.amount)}</p>
                                        <button onClick={() => deleteItem(e)}>
                                            <MdDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
        </Modal>
    )
}

export default ViewExpense;