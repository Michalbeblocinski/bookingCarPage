import React, { Fragment, useContext, useEffect, useState } from "react";
import AddCarForm from "../../components/addCarForm/addCarForm";
import GetCars from "../../components/getCars/getCars";
import { UserContext } from "../../contexts/user.context";
import "./myaccount.css";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

function Myaccount() {
  const { currentUser } = useContext(UserContext);
  const email = currentUser?.email;
  const [displayName, setDisplayName] = useState();
  const [userEmail, setUserEmail] = useState();

  const fetchPostData = async () => {
    await getDocs(collection(db, "users"))
    .then((QuerySnapshot)=>{
        
      const newData = QuerySnapshot.docs
      .map((doc) => ({...doc.data(0), id:doc.id}))
      const newDataFiltered = newData.filter(f => f.email === email)
      setDisplayName(newDataFiltered[0]?.displayName)
      setUserEmail(newDataFiltered[0]?.email)

        console.log("User zostal zaciagniety")
    })
    
}
useEffect(() => {
  if(currentUser){fetchPostData();}
}, [currentUser]);
  return (
    <Fragment>
    {currentUser ? (
    <div className="cr__myAcc-container">
      <div className="cr__myAcc-container-title">
        <h1>Your profile</h1>
        <p>Name : {displayName}</p>
        <p>Email : {userEmail} </p>
      </div>
      
        <div className="cr_myAcc-addCarForm">
          <AddCarForm></AddCarForm>
        </div>
        <div className="cr_myAcc-data-container">
        <div className="cr_myAcc-getCars">
          <GetCars></GetCars>
        </div>
      </div>
      {/* { currentUser.email !== null && currentUser.email !== undefined ? (<div>profil uzytkownika {currentUser.email}</div>)  : (<div>No access</div>)} */}
    </div>
  ):(<div>Nie ma usera</div>)} 
  </Fragment>);
 
}

export default Myaccount;
