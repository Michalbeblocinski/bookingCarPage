import React, { useContext, useEffect, useState } from "react";
import "./bookingpopularfeature.css";
import car from "../../assets/rsz_merol.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  TextField,
} from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";

import DatePicker from "react-datepicker";
import { UserContext } from "../../contexts/user.context";
function BookingPopularFeature(props) {
  const data123 = props;
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { currentUser } = useContext(UserContext)
  function dateConverter(data) {
    let temp = data;
    console.log("Przed petla: ", temp);
    for (let i = 0; i < temp.length; i++) {
      temp[i] = new Date(temp[i].seconds * 1000);
    }
    console.log("Po petli", temp);
    return temp;
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //console.log(data123)
  const bookingHandler = async (e) => {
    e.preventDefault();
    try {
      // setTerm1((currentTerm) => { return currentTerm.concat(startDate)})
      // setTerm2((currentTerm) => { return currentTerm.concat(endDate)})


      const docRef = doc(db, "vehicles", data123.data.id);

      await updateDoc(docRef, {
        termsStart: arrayUnion(startDate),
        termsEnd: arrayUnion(endDate),
      });

      console.log("Pomyslnie zaaktualizowane dane");
      setOpen(false);
    } catch (e) {
      console.error("Error updating vehicle: ", e);
    }
  };
  useEffect(() => {
    
  }, []);
  return (
    <div className="cr__features-pFcontainer">
      <div className="cr__features-pFimage">
        {data123.data.imageUrl ? (
          <img src={data123.data.imageUrl} alt="car" />
        ) : (
          <img src={car} alt="car" />
        )}
      </div>
      <div className="cr__features-pFname">
        <p>{data123.data.name}</p>
      </div>
      <div className="cr__features-pFspecify">
        <table>
          <tbody>
            <tr>
              <td>
                <i className="fa-solid fa-user-group"></i>
                {data123.data.passengerCapacity} People{" "}
              </td>
              <td>
                <i className="fa-solid fa-gear"></i>
                {data123.data.transmissionType}{" "}
              </td>
            </tr>

            <tr>
              <td>
                <i className="fa-solid fa-gauge"></i>
                {data123.data.fuelConsumption}km/1-litre
              </td>
              <td>
                <i className="fa-solid fa-gas-pump"></i>
                {data123.data.fuelType}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cr__features-pFprice">
        <span className="cr__features-pFprice-day">
          ${data123.data.pricePerDay}{" "}
        </span>
        /PerDay {<i className="fa-solid fa-phone"></i>}
        {data123.data.phoneNumber}
      </div>
      {currentUser ? <Button
        variant="outlined"
        startIcon={<i className="fa-solid fa-pen-to-square"></i>}
        color="secondary"
        onClick={handleClickOpen}
      >
        Book
      </Button> : (<div>Please log in to make a reseravation </div>) }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>Wchich terms</DialogContentText>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={bookingHandler}>Save Reservation</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookingPopularFeature;
