'use client';

import { useState, createContext, useEffect } from "react";

import { db } from '@/app/lib/firebase/index';
import { collection, addDoc, getDocs, doc, deleteDoc, Timestamp } from 'firebase/firestore';

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }) {

    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const addIncomeItem = async (newIncome) => {
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
          } catch (error) {
            console.error("Error adding document: ", e);
            throw e;
          }
    };

    const removeIncomeItem = async (handlerId) => {
        try {
            await deleteDoc(doc(db, "income", handlerId));
            setIncome((prevState) => {
              return prevState.filter((i) => i.id !== handlerId)
            })
          } catch (error) {
            console.error(error.message);
            throw error;
          }
    };

    const values = { income, expenses, addIncomeItem, removeIncomeItem }

    useEffect(() => {
        const getIncomeData = async () => {
          const querySnapShot = await getDocs(collection(db, "income"));
          const data = querySnapShot.docs.map((docs) => {
            return {
              id: docs.id,
              ...docs.data(),
            };
          });
          setIncome(data);
        };
        
        const getExpensesData = async () => {
          const querySnapShot = await getDocs(collection(db, "expenses"));
          const data = querySnapShot.docs.map((exp) => {
            return {
              id: exp.id,
              ...exp.data(),
            }
          });
          setExpenses(data);
        };
        
        getIncomeData();
        getExpensesData();
        
      }, []);
    
    return <financeContext.Provider value={values}>
        {children}
    </financeContext.Provider>
}