import classes from './AddPayment.module.css'
import React, {useRef, useState} from "react";
import {collection, doc, setDoc, addDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const AddPayment = () => {
  const history = useHistory();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      let docData = {
        payment: amountInputRef.current.value,
        date: dateInputRef.current.value,
      }
      let newDate = getDate(dateInputRef.current.value);
      // await setDoc(doc(db, 'payments', `${newDate[1]}`, 'date', `${newDate[0]}`), docData);

      await setDoc(doc(db, 'milkman', 'payments', `${newDate[1]}`, `${newDate[0]}`), docData);

      // alert('Payment added Successfully.');
      toast.success("Payment added Successfully.!", {
        position: toast.POSITION.TOP_CENTER
      });
      history.replace('/');

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
     <section className={classes.header}>
       <h1>Add Payment</h1>
       <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='payment'>Add Amount</label>
            <input type='number' id='payment' min='1' required ref={amountInputRef} />
          </div>
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
         <div className={classes.actions}>
           <button>Submit</button>
         </div>
       </form>
     </section>
  )
};

export default AddPayment;