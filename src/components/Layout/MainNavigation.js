import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return(
     <header className={classes.header}>
       <Link to='/' className={classes.mainLink}>
         <div className={classes.logo}>MilkMan</div>
       </Link>
       <nav>
         {/*<ul>*/}
         {/*  <li>*/}
         {/*    <Link to='/add_amount'>Add Amount</Link>*/}
         {/*  </li>*/}
         {/*  <li>*/}
         {/*    <Link to='/add_payment'>Add Payment</Link>*/}
         {/*  </li>*/}
         {/*  <li>*/}
         {/*    <Link to='/add_gap'>Add Profile</Link>*/}
         {/*  </li>*/}
         {/*</ul>*/}
         <Link to='/add_amount'>
           <button type='button'>Add Order</button>
         </Link>
         <Link to='/add_payment'>
           <button type='button'>Add Payment</button>
         </Link>
         <Link to='/profile'>
           <button type='button'>Profile</button>
         </Link>
         <Link to='/report'>
           <button type='button'>Report</button>
         </Link>
       </nav>
     </header>
  )
};

export default MainNavigation;