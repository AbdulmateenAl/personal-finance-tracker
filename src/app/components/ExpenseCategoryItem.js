import { useState } from 'react';

import {currencyFormatter} from '@/app/lib/utils';

import ViewExpense from '../Modals/ViewExpense';

function ExpenseCategoryItem({expense}) {
    
    const [viewExpenseModal, setViewExpenseModal] = useState(false);
    
    return (
        <>
        <ViewExpense show={viewExpenseModal} onClose={setViewExpenseModal} expense={expense}/>
        <button onClick={() => {setViewExpenseModal(true)}}>
            <div className='flex items-center justify-between py-4 px-4 bg-slate-700 rounded-3xl'>
                <div className='flex items-center gap-2'>
                    <div className='w-[25px] h-[25px] rounded-full bg-yellow-500' style={{ backgroundColor: expense.color }}/>
                    <h4 className='capitalize'>{expense.title}</h4>
                </div>
                <p>{currencyFormatter(expense.total)}</p>
            </div>
        </button>
        </>
    )
}

export default ExpenseCategoryItem;