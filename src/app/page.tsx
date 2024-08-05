"use client";
import {currencyFormatter} from '@/app/lib/utils';
import ExpenseCategoryItem from '@/app/components/ExpenseCategoryItem';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useRef, useEffect } from 'react';
import Modal from '@/app/components/Modal';
import { db } from '@/app/lib/firebase/index';
import { collection, addDoc, getDocs } from 'firebase/firestore';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dummy_data = [
  {
    id: 1,
    color: 'white',
    title: 'Entertainment',
    total: 20,
  },
  {
    id: 2,
    color: 'yellow',
    title: 'Data',
    total: 10,
  },
  {
    id: 3,
    color: 'red',
    title: 'Food',
    total: 50,
  },
  {
    id: 4,
    color: 'pink',
    title: 'Clothes',
    total: 70,
  },
  {
    id: 5,
    color: 'purple',
    title: 'Fuel',
    total: 50,
  },
]

export default function Home() {

  const [income, setIncome] = useState([]);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  // Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    }
    try {
      const docRef = await addDoc(collection(db, "income"), newIncome);
      console.log("Document written with ID: ", docRef.id);
      // Update state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docRef.id,
            ...newIncome,
          },
        ]
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // useEffect(() => {
  //   const getIncomeData = async () => {
  //     const collectionRef = collection(db, "income");
  //     const docsSnap = await getDocs(collectionRef);

  //     const data = docsSnap.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //         createdAt: new Date(doc.data().createdAt.toMillis()),
  //       };
  //     });

  //     setIncome(data);
  //     console.log(income);
  //   };

  //   getIncomeData();
  // }, []);
  
  return (
    <>
    {/* Show Income Modal */}
    <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
      <form onSubmit={addIncomeHandler} action="">
        <div className='flex flex-col gap-2 py-3'>
          <label htmlFor="amount">Income Amount</label>
          <input name="amount" ref={amountRef} type="number" min={0.01} step={0.01} placeholder='Enter income amount' required />
          <label className='mt-2' htmlFor="description">Description</label>
          <input name="description" ref={descriptionRef} type="text" placeholder='Enter income description' required />
          <button className='mt-2 btn btn-primary'>Add Entry</button>
        </div>
        <div className='flex f;ex-col gap-4 mt-6'>
          <h3 className='font-bold text-2xl capitalize'>Income History</h3>
        </div>
      </form>
    </Modal> 
    <main className="container max-w-2xl px-6 mx-auto">
      {/* Balance section */}
      <section className="py-2">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{ currencyFormatter(952) }</h2>
      </section>

      {/* Button */}
      <section className="flex item-center gap-2 py-3">
        <button onClick={() => {  }} className="btn btn-primary">Expenses</button>
        <button onClick={() => { setShowAddIncomeModal(true) }} className="btn btn-primary-outline">Income</button>
      </section>

      {/* My Expenses */}
      <section className='py-6'>
        <h2 className='text-2xl'>My Expenses</h2>
        <div className='flex flex-col gap-4 mt-6'>
          {/* Expense Item */}
          {Dummy_data.map((expense) => {
            return (
            <ExpenseCategoryItem
              key={expense.id}
              color={expense.color}
              title={expense.title}
              total={expense.total}/>
          );
          })}
        </div>
      </section>
      {/* Chart section */}
      <section className='py-6'>
          <h3 className='text-2xl'>Stats</h3>
          <div className='w-1/2 mx-auto'>
          <Doughnut data={{
            labels: Dummy_data.map(expense => expense.title),
            datasets: [
              {
                label: 'Expenses',
                data: Dummy_data.map(expense => expense.total),
                backgroundColor: Dummy_data.map(expense => expense.color),
                borderColor: ['#10101b'],
                borderWidth: 5,
              }
            ]
          }} />
          </div>
      </section>
    </main>
    </>
  );
}
