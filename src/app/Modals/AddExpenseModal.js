import { useRef, useState, useContext } from 'react';
import { financeContext } from '../lib/store/finance-context';

import Modal from '../components/Modal';
import ExpenseCategoryItem from '../components/ExpenseCategoryItem';
import AddNewCategory from '@/app/Modals/AddNewCategory';

function AddExpenseModal({show, onClose}){

    const [showNewCategory, setShowNewCategory] = useState(true);
    const totalRef = useRef();
    const colorRef = useRef();
    const titleRef = useRef();
    const { expenses, addExpenseItem } = useContext(financeContext);

    const addExpenseHandler = async (e) => {
        e.preventDefault();
        const currentTimeStamp = new Date();
        const newExpenses = {
            color: colorRef.current.value,
            title: titleRef.current.value,
            total: totalRef.current.value,
        }

        try {
            await addExpenseItem(newExpenses);
            colorRef.current.value = '';
            titleRef.current.value = '';
            totalRef.current.value = '';

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <Modal show={show} onClose={onClose}>
            <div>
                <div className='py-2'>
                    <p>Enter an amount, and then select a category...</p>
                </div>
                <div className='py-2'>
                    <input className='w-full' type='number' ref={totalRef} placeholder='Enter expense amount' min={0.01} step={0.01} required/>
                </div>
                <div className='flex flex-row justify-between py-5'>
                    <h2 className='text-xl'>Select Expense Category</h2>
                    <button onClick={() => {console.log("Clicked on new category button!")}} className='btn text-lime-500'>+ New Category</button>
                </div>
                <AddNewCategory 
                    visible={showNewCategory}
                    invisible={setShowNewCategory}
                    titleRef={titleRef}
                    colorRef={colorRef}
                    AddExpense={addExpenseHandler}/>
                <div className='flex flex-col mt-4'>
                    {expenses.map((expense) => {
                        return (
                            <ExpenseCategoryItem
                            key={expense.id}
                            color={expense.color}
                            title={expense.title}
                            total={expense.total}
                            />
                        )
                    })}
                </div>
            </div>
        </Modal>
    )
}

export default AddExpenseModal;