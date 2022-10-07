import React, { useState, useRef } from 'react';
import classes from './AddAmount.module.css'

import {db} from '../../firebase'
import {collection, doc, setDoc, addDoc} from 'firebase/firestore'
import {useHistory} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAmount = () => {
  const history = useHistory();
  const amountInputRef = useRef();
  const dateInputRef = useRef();
  const nagaReasonInputRef = useRef();
  const [isGap, setIsGap] = useState(false);

  const switchAddMode = () => {
    setIsGap((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      let docData = {
        kilo: isGap ? 0 : amountInputRef.current.value,
        date: dateInputRef.current.value,
        naga: isGap,
        reason: isGap ? nagaReasonInputRef.current.value : '',
      }
      let newDate = getDate(dateInputRef.current.value);
      // await setDoc(doc(db, 'orderlines', `${newDate[1]}`, 'date', `${newDate[0]}`), docData);

      await setDoc(doc(db, 'milkman', 'orders', `${newDate[1]}`, `${newDate[0]}`), docData);

      // alert('Data added successfully.');

      toast.success("Data added Successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
      history.replace('/');

      // setTimeout(() => {
      //   history.replace('/');
      // }, 2000);
    } catch (err) {
      // alert(err);
      console.log(err);
      toast.error('Error Notification. Check Console', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const getDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let d = new Date(date);
    return [d.getDate(), monthNames[d.getMonth()], d.getFullYear()]
  }

  return(
     <section className={classes.auth}>
       <h1>{isGap ? 'Add Day Gap' : 'Add kilo'}</h1>
       <form onSubmit={submitHandler}>
         {!isGap && (
            <div className={classes.control}>
              <label htmlFor='amount'>Add kilo</label>
              <input type='number' id='amount' min='1' max='100' step='1' required ref={amountInputRef} defaultValue='1' />
            </div>
         )}
         <div className={classes.control}>
           <label htmlFor='dateField'>Date</label>
           <input
              type='date'
              min='2022-01-01'
              max={new Date().toLocaleDateString('en-ca')}
              id='dateField'
              required
              ref={dateInputRef}
              defaultValue={new Date().toISOString().slice(0, 10)}
           />
         </div>
         {isGap && (
            <div className={classes.control}>
              <label htmlFor='gap'>Enter Gap Reason</label>
              <textarea
                 id="gap"
                 cols="39"
                 rows="7"
                 required
                 ref={nagaReasonInputRef}
              />
            </div>
         )}
         <div className={classes.actions}>
           <button>{isGap ? 'Submit Gap' : 'Submit Kilo'}</button>
           <button
              type='button'
              className={classes.toggle}
              onClick={switchAddMode}
           >
             {isGap ? 'Add kilo' : 'Add Day Gap'}
           </button>
         </div>
       </form>
     </section>
  )
};

export default AddAmount