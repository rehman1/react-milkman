import React, {useEffect, useRef, useState} from "react";
import classes from './Setting.module.css'
import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Setting = () => {
  const nameInputRef = useRef();
  const contactInputRef = useRef();
  const [profile, setProfile] = useState({contact: '', name: ''})
  const [isEdit, setIsEdit] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=> {

    const getProfileHandler = async () => {
      setIsLoading(true);
      const profileRef = doc(db, "milkman", "profiles");
      const profileSnap = await getDoc(profileRef);

      setProfile(profileSnap.data());
      setIsLoading(false);
    }
    try {
      getProfileHandler();

    } catch (e) {
      setIsLoading(false);
      alert(e)
    }
  },[isEdit]);

  const editProfileHandler = () => {
    setIsProfileEdit((prevState) => !prevState);
  }

  // const updateProfileHandler = async () => {
  //   const profileUpRef = doc(db, "profiles", "profile");
  //
  //   await updateDoc(profileUpRef, {
  //     contact: '0000000'
  //   });
  // }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (nameInputRef.current.value.trim().length === 0) {
      // console.log(nameInputRef.current.value.trim());
      toast.warning("Enter valid name!", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    try {
      let docData = {
        name: nameInputRef.current.value.trim(),
        contact: contactInputRef.current.value,
      }
      await setDoc(doc(db, 'milkman', 'profiles'), docData)

      // toast.success('Successfully update.!', {
      //   position: toast.POSITION.BOTTOM_CENTER,
      //   className: 'toast-message'
      // });
      setIsEdit((prevState) => !prevState);
      setIsProfileEdit(false);
      // alert('Successfully update.');
      toast.success("Data added successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (err) {
      // alert(err);
      console.log(err);
      toast.error('Error Notification. Check Console', {
        position: toast.POSITION.TOP_CENTER
      });
    }

  }

  if (isLoading) {
    return(
       <section className={classes.profile}>
         <div className={classes.loading}>
           <p>Loading...!</p>
         </div>
       </section>
    )
  }


  return(
     <section className={classes.profile}>
       <h1>Milkman profile</h1>
       {isLoading && (
          <div className={classes.loading}>
            <p>Loading...!</p>
          </div>
       )}
       {!isLoading && !isProfileEdit && (
          <div className={classes.view}>
            <div  className={classes.contact}>
              <div>
                <label>Name: </label>
                <span>{profile.name !== '' ? profile.name : '---'}</span>
              </div>
             <div>
               <label>Phone #: </label>
               <span>{profile.contact !== '' ? profile.contact : '---'}</span>
             </div>
            </div>
            <button type="button" className={classes.btnSetting} onClick={editProfileHandler}>{profile.name === '' ? 'Add Profile' : 'Edit Profile'}</button>
          </div>
       )}
       {!isLoading && isProfileEdit && (
          <form onSubmit={submitHandler}>
            <div className={classes['form-control']}>
              <label htmlFor='name'>Your Name</label>
              <input
                 ref={nameInputRef}
                 type='text'
                 id='name'
                 defaultValue={profile.name}
                 required
              />
            </div>
            <div className={classes['form-control']}>
              <label htmlFor='contact'>Phone Number</label>
              <input
                 ref={contactInputRef}
                 type='text'
                 id='contact'
                 defaultValue={profile.contact}
                 required
                 placeholder="0300-0000000"
                 pattern="[0-9]{4}-[0-9]{7}"
              />
            </div>
            <div className={classes['form-actions']}>
              <button className={classes.btnSetting}>Submit</button>
              <button type='button' className={`${classes.btnSetting} ${classes.btnCancel}`} onClick={editProfileHandler}>Cancel</button>
            </div>
          </form>
       )}
     </section>
  )
};

export default Setting;