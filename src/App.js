import React from "react";
import Layout from "./components/Layout/Layout";
import {Switch, Route, Redirect} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AmountPage from "./pages/AmountPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import ReportPage from "./pages/ReportPage";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/add_amount'>
            <AmountPage />
          </Route>
          <Route path='/add_payment'>
            <PaymentPage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
          <Route path='/report'>
            <ReportPage />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
      <ToastContainer autoClose={3000} />
    </React.Fragment>
  );
}

export default App;
