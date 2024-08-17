import { useEffect, useRef, useContext } from "react"

import {currencyFormatter} from '@/app/lib/utils';

import { MdDeleteOutline } from "react-icons/md";

import Modal from '@/app/components/Modal';
import { financeContext } from "../lib/store/finance-context";

import { db } from '@/app/lib/firebase/index';
import { collection, addDoc, getDocs, doc, deleteDoc, Timestamp } from 'firebase/firestore';

function AddIncomeModal({ show, onClose }) {

    const amountRef = useRef();
    const descriptionRef = useRef();
    const { income, addIncomeItem, removeIncomeItem } = useContext(financeContext)

    //Handler functions
    const addIncomeHandler = async (e) => {
        e.preventDefault();
        const currentTimestamp = new Date();

        console.log(currentTimestamp.toLocaleString()); 
        const newIncome = {
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          createdAt: currentTimestamp.toLocaleString(),
        }

        try {
            await addIncomeItem(newIncome);
            amountRef.current.value = "";
            descriptionRef.current.value = "";
        } catch (error) {
            console.log(error.message);
        }
        
    };
    
      // Delete Handler function
      const deleteIncomeHandler = async (handlerId) => {
        try {
            await removeIncomeItem(handlerId);
        } catch (error) {
            console.log(error.message);
        }
      };
    
    return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} action="">
        <div className='flex flex-col flex-grow gap-2 py-3'>
          <label htmlFor="amount">Income Amount</label>
          <input name="amount" ref={amountRef} type="number" min={0.01} step={0.01} placeholder='Enter income amount' required />
          <label className='mt-2' htmlFor="description">Description</label>
          <input name="description" ref={descriptionRef} type="text" placeholder='Enter income description' required />
          <button className='mt-2 btn btn-primary'>Add Entry</button>
        </div>
      </form>
      <div className='flex flex-col gap-4 mt-6'>
        <h3 className='font-bold text-2xl capitalize'>Income History</h3>
        {income.map((i) => {
          return (
            <div className='flex items-center justify-between' key={i.id}>
              <div>
                <p>{i.description}</p>
                <small>{i.createdAt}</small>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <p>{currencyFormatter(i.amount)}</p>
                <button onClick={() => { deleteIncomeHandler(i.id) }}><MdDeleteOutline /></button>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
    )
}

export default AddIncomeModal;