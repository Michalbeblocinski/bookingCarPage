import React, { useContext, useEffect, useState } from "react";
import "./popularfeature.css";
import car from "../../assets/rsz_merol.png";
import {
  Button,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { FormControl } from "react-bootstrap";
import { CarsContext } from "../../contexts/cars.context";

function PopularFeature(props) {
  const data123 = props;
  const [open, setOpen] = useState(false);
  const { numberOfCars, setNumberOfCars } = useContext(CarsContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState(data123.data.name);
  const [passengerCapacity, setPassengerCapacity] = useState(
    data123.data.passengerCapacity
  );
  const [transmissionType, setTransmissionType] = useState(
    data123.data.transmissionType
  );
  const [fuelConsumption, setFuelConsumption] = useState(
    data123.data.fuelConsumption
  );
  const [vehicleType, setVehicleType] = useState(data123.data.vehicleType);
  const [fuelType, setFuelType] = useState(data123.data.fuelType);
  const [pricePerDay, setPricePerDay] = useState(data123.data.pricePerDay);
  const [phoneNumber, setPhoneNumber] = useState(data123.data.phoneNumber);
  const [city, setCity] = useState(data123.data.city);
  const [startDate, setStartDate] = useState(data123.data.startDate);
  const [endDate, setEndDate] = useState(data123.data.endDate);

  const handleDelete = async (e) => {
    try {
      const docRef = doc(db, "vehicles", data123.data.id);
      await deleteDoc(docRef);
      setNumberOfCars(numberOfCars - 1);
      console.log("Pomyslnie skasowano samochod o nazwie", name);
    } catch (e) {
      console.error("error delete: ", e);
    }
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "vehicles", data123.data.id);
      const updateData = {
        name: name,
        passengerCapacity: passengerCapacity,
        transmissionType: transmissionType,
        fuelConsumption: fuelConsumption,
        vehicleType: vehicleType,
        fuelType: fuelType,
        pricePerDay: pricePerDay,
        phoneNumber: phoneNumber,
      };
      await updateDoc(docRef, updateData);
      alert("Pomyslnie zaaktualizowane dane");
      setOpen(false);
    } catch (e) {
      console.error("Error updating vehicle: ", e);
    }
  };
  useEffect(() => {}, [name]);
  //console.log(data123)
  return (
    <div className="cr__features-pFcontainer1">
      <div className="cr__features-buttons">
        <Button
          variant="outlined"
          startIcon={<i className="fa-solid fa-pen-to-square"></i>}
          color="secondary"
          onClick={handleClickOpen}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          startIcon={<i className="fa-solid fa-trash"></i>}
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can change your car properties here
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Car Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputLabel variant="standard" id="passagers">
              Ammount of passagers
            </InputLabel>
            <NativeSelect
              id="passagersSelect"
              defaultValue={passengerCapacity}
              label="Ammount of passagers"
              onChange={(event) => setPassengerCapacity(event.target.value)}
              fullWidth
            >
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
              <option value={4}>Four</option>
              <option value={5}>Five</option>
            </NativeSelect>
            <InputLabel variant="standard" id="gearBoxSelect">
              GearBox
            </InputLabel>
            <NativeSelect
              id="gearBoxsSelect"
              defaultValue={transmissionType}
              label="GearBox"
              onChange={(event) => setTransmissionType(event.target.value)}
              fullWidth
            >
              <option value={"Manual"}>Manual</option>
              <option value={"Automatic"}>Automatic</option>
            </NativeSelect>
            <TextField
              id="outlined-name"
              label="Fuel Consumption per 1 Litre"
              type="number"
              variant="standard"
              value={fuelConsumption}
              onChange={(event) => setFuelConsumption(event.target.value)}
              fullWidth
              margin="dense"
            ></TextField>
            <InputLabel id="vehicleType">Vehicle Type</InputLabel>
            <NativeSelect
              id="vehicleTypeSelect"
              label="VehicleType"
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value)}
              fullWidth
            >
              <option value={"Car"}>Car</option>
              <option value={"Motorcycle"}>Motorcycle</option>
              <option value={"Delivery"}>Delivery</option>
              <option value={"Agricultural"}>Agricultural</option>
            </NativeSelect>
            <InputLabel id="fuelType">Fuel Type</InputLabel>
            <NativeSelect
              id="fuelTypeSelect"
              label="fuelType"
              value={fuelType}
              onChange={(event) => setFuelType(event.target.value)}
              fullWidth
            >
              <option value={"LPG"}>LPG</option>
              <option value={"ON"}>ON</option>
              <option value={"PB"}>PB</option>
              <option value={"Electrical"}>Electrical</option>
            </NativeSelect>
            <TextField
              id="outlined-name"
              label="Price per Day"
              type="number"
              variant="standard"
              value={pricePerDay}
              onChange={(event) => setPricePerDay(event.target.value)}
              fullWidth
              margin="dense"
            ></TextField>
            <TextField
              id="outlined-name"
              label="Phone Number"
              type="number"
              variant="standard"
              placeholder="+48 123 123 123"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              fullWidth
              margin="dense"
            ></TextField>
            <InputLabel id="city">City</InputLabel>
            <NativeSelect
              id="citySelect"
              label="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              fullWidth
            >
              <option value={"Warszawa"}>Warszawa</option>
              <option value={"Wrocław"}>Wrocław</option>
              <option value={"Poznań"}>Poznań</option>
              <option value={"Kraków"}>Kraków</option>
              <option value={"Częstochowa"}>Częstochowa</option>
            </NativeSelect>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="cr__features-pFimage">
        {data123.data.imageUrl ? (
          <img src={data123.data.imageUrl} alt="car" />
        ) : (
          <img src={car} alt="car" />
        )}
      </div>
      <div className="cr__features-pFname">
        <p>{name}</p>
      </div>
      <div className="cr__features-pFspecify">
        <table>
          <tbody>
            <tr>
              <td>
                <i className="fa-solid fa-user-group"></i>
                {passengerCapacity} People{" "}
              </td>
              <td>
                <i className="fa-solid fa-gear"></i>
                {transmissionType}{" "}
              </td>
            </tr>

            <tr>
              <td>
                <i className="fa-solid fa-gauge"></i>
                {fuelConsumption}km/1-litre
              </td>
              <td>
                <i className="fa-solid fa-gas-pump"></i>
                {fuelType}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cr__features-pFprice">
        <div className="cr__features-pFprice-day-container">
          <span className="cr__features-pFprice-day">${pricePerDay} </span>
          /PerDay
        </div>{" "}
        <div className="cr__features-pFprice-phone">
          {<i className="fa-solid fa-phone"></i>}
          {phoneNumber}
        </div>
      </div>
    </div>
  );
}

export default PopularFeature;
