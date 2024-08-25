'use client';

import { useState, createContext, useEffect } from "react";

import { db } from '@/app/lib/firebase/index';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { it } from "node:test";

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
    addExpenseItem: async () => {},
    updateExpenseItem: async () => {},
    removeExpenseCategory: async () => {},
    removeExpenseItem: async () => {},
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
            });
          } catch (error) {
            console.error("Error adding document: ", e);
            throw e;
          }
        };
        
    const addExpenseItem = async (newExpense) => {
      try {
        const docRef = await addDoc(collection(db, "expenses"), newExpense);
        console.log("Document written with ID: ", docRef.id);
        setExpenses((prevState) => {
          return [
            ...prevState,
            {
              id: docRef.id,
              ...newExpense,
            },
          ]
        });
      } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
      }
    };

    const updateExpenseItem = async (expense_id, newExpense) => {
      const docRef = doc(db, 'expenses', expense_id);

      try {
        await updateDoc(docRef, {...newExpense});

        setExpenses((prevState) => {
          const updatedExpenses = [...prevState];
          const foundIndex = updatedExpenses.find((e) => {
            return e.id === expense_id;
          });
          updatedExpenses[foundIndex] = { id: expense_id, ...newExpense };
          return updatedExpenses;
        })
      } catch (error) {
        throw error;
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

    const removeExpenseCategory = async (expense_id) => {
      try {
        await deleteDoc(doc(db, "expenses", expense_id))
        setExpenses((prevState) => {
          return prevState.filter((e) => e.id !== expense_id)
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    } ;

    const removeExpenseItem = async (newItem, itemId) => {
      const docRef = doc(db, "expenses", itemId);
      try {
        await updateDoc(docRef, {...newItem});
        setExpenses((prevState) => {
          const updatedExpenses = [...prevState];
          const pos = updatedExpenses.findIndex((ex) => ex.id === itemId);
          updatedExpenses[pos].items = [...updatedExpenses.items];
          updatedExpenses[pos].total = updatedExpenses.total;

          return updatedExpenses;
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    const values = { income, expenses, addIncomeItem, removeIncomeItem, removeExpenseItem, removeExpenseCategory, addExpenseItem, updateExpenseItem }

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