"use client";
import {currencyFormatter} from '@/app/lib/utils';
import ExpenseCategoryItem from '@/app/components/ExpenseCategoryItem';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext, useState, useEffect } from 'react';
import { authContext } from './lib/store/auth-context';

import {financeContext } from '@/app/lib/store/finance-context';

import AddIncomeModal from '@/app/Modals/AddIncomeModal';
import AddExpenseModal from '@/app/Modals/AddExpenseModal';
import SignIn from '@/app/components/SignIn';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [ balance, setBalance ] = useState(0);
  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    const newBalance = income.reduce((total, i) => { return total + i.amount }, 0) - expenses.reduce((total, e) => { return total + e.total }, 0);
    setBalance(newBalance);
  }, [ expenses, income ]);
  
  // if (!user) {
  //   return <SignIn />
  // }
  return (
    <>
    <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
    <AddExpenseModal show={showAddExpenseModal} onClose={setShowAddExpenseModal} />
    <main className="container max-w-2xl px-6 mx-auto">
      {/* Balance section */}
      <section className="py-2">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{ currencyFormatter(balance) }</h2>
      </section>

      {/* Button */}
      <section className="flex item-center gap-2 py-3">
        <button onClick={() => { setShowAddExpenseModal(true) }} className="btn btn-primary">Expenses</button>
        <button onClick={() => { setShowAddIncomeModal(true) }} className="btn btn-primary-outline">Income</button>
      </section>

      {/* My Expenses */}
      <section className='py-6'>
        <h2 className='text-2xl'>My Expenses</h2>
        <div className='flex flex-col gap-4 mt-6'>
          {/* Expense Item */}
          {expenses.map((expense) => {
            return (
            <ExpenseCategoryItem
              key={expense.id}
              expense={expense}
            />
          );
          })}
        </div>
      </section>
      {/* Chart section */}
      <section className='py-6'>
        <a id='stats'>
          <h3 className='text-2xl'>Stats</h3>
          <div className='w-1/2 mx-auto'>
          <Doughnut data={{
            labels: expenses.map(expense => expense.title),
            datasets: [
              {
                label: 'Expenses',
                data: expenses.map(expense => expense.total),
                backgroundColor: expenses.map(expense => expense.color),
                borderColor: ['#10101b'],
                borderWidth: 5,
              }
            ]
          }} />
          </div>
          </a>
      </section>
    </main>
    </>
  );
}
