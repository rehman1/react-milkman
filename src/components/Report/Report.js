import React, {useState, useRef, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase'
import ReportItem from "./ReportItem";
import classes from './Report.module.css'
import {toast} from "react-toastify";

const Report = () => {
  const [payment, setPayment] = useState([])
  const [orderLine, setOrderLine] = useState([])
  const [reportVisible, setReportVisible] = useState(false);
  let kiloSum = 0;
  let paymentSum = 0;
  let naga = [];
  const selectInputRef = useRef();

  const reportHandler = async (event) => {
    try {
      if (selectInputRef.current.value === "") {
        toast.warning("Please select month!", {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      // const paymentRef = collection(db, "payments", `${selectInputRef.current.value}`, "date");
      const paymentRef = collection(db, "milkman","payments", `${selectInputRef.current.value}`);
      const paymentSnap = await getDocs(paymentRef);
      setPayment(getDocsData(paymentSnap.docs));

      // const orderLineRef = collection(db, "orders", `${selectInputRef.current.value}`, "date");
      const orderLineRef = collection(db, "milkman","orders", `${selectInputRef.current.value}`);
      const orderLineSnap = await getDocs(orderLineRef);
      setOrderLine(getDocsData(orderLineSnap.docs));

      setReportVisible(true);
    } catch (error) {
      alert(error);
    }
  }

  const getDocsData = (docs) => {
    let documents = [];
    docs.map(doc => (
      documents.push(doc.data())
    ));
    return documents;
  }

  const getKiloSum = () => {
    orderLine.map(order => (
      kiloSum += parseInt(order.kilo)
    ))
    return kiloSum;
  }

  const getNagaSum = () => {
    naga = orderLine.filter(order => order.naga === true)
    return naga.length;
  }

  const getPaymentSum = () => {
    payment.map(pay => (
      paymentSum += parseInt(pay.payment)
    ))
    return paymentSum;
  }

  return(
     <div className={classes.report}>
       <h1>Welcome on Report</h1>
       <div className={classes.controls}>
         <select className="form-select" aria-label="Default select example" required ref={selectInputRef}>
           <option value="">Select the month: </option>
           <option value="January">January</option>
           <option value="February">February</option>
           <option value="March">March</option>
           <option value="April">April</option>
           <option value="May">May</option>
           <option value="June">June</option>
           <option value="July">July</option>
           <option value="August">August</option>
           <option value="September">September</option>
           <option value="October">October</option>
           <option value="November">November</option>
           <option value="December">December</option>
         </select>
         <button type="button" onClick={reportHandler}>
           Get Report
         </button>
       </div>
       {reportVisible && (
          <React.Fragment>
            <div className={classes.monthlyTotal}>
              <div>
                <label>Total kilo bought: </label>
                <span>{getKiloSum() + ' KG'}</span>
              </div>
              <div>
                <label>Total payment given: </label>
                <span>{getPaymentSum() + ' rps'}</span>
              </div>
              <div>
                <label>Total Naga: </label>
                <span>{getNagaSum()}</span>
              </div>
            </div>
            <div className={classes.reportTableWrapper}>
              <div className={classes.reportTableScroll}>
                <table>
                  <thead>
                  <tr>
                    <th>Date</th>
                    <th>Kilo</th>
                    <th>Naga Reason</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orderLine.map(order => (
                     <tr key={order.date}>
                       <td>{order.date}</td>
                       <td>{order.kilo}</td>
                       <td>{order.reason}</td>
                     </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p></p>
          </React.Fragment>
       )}
     </div>
  )
};

export default Report;