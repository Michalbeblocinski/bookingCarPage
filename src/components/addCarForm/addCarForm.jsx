import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { collection, addDoc } from "firebase/firestore";
import Select from "@mui/material/Select";
import { CarsContext } from "../../contexts/cars.context";
import {
  Alert,
  alertTitleClasses,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import DatePicker from "react-datepicker";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


function AddCarForm() {
  const [open, setOpen] = useState(false);
  const { numberOfCars, setNumberOfCars } = useContext(CarsContext);
  const { currentUser } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");
  const [passengerCapacity, setPassengerCapacity] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fileType, setFileType] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileType(file.type);
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    if (startDate <= endDate) {
      // const file = selectedFile;
      // setFileType(file.type);

      if (
        fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg"
      ) {
        try {
          const fileRef = ref(storage, `car-images/${selectedFile.name}`);
          const snapshot = await uploadBytes(fileRef, selectedFile);
          const url = await getDownloadURL(fileRef);
          const docRef = await addDoc(collection(db, "vehicles"), {
            name: name,
            passengerCapacity: passengerCapacity,
            transmissionType: transmissionType,
            fuelConsumption: fuelConsumption,
            vehicleType: vehicleType,
            userEmail: currentUser.email,
            fuelType: fuelType,
            phoneNumber: phoneNumber,
            pricePerDay: pricePerDay,
            city: city,
            imageUrl: url,
            startDate: startDate,
            endDate: endDate,
            termsStart: [],
            termsEnd: [],
          });
          setNumberOfCars(numberOfCars + 1);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding vehicle: ", e);
        }
      } else setOpen(true);
    } else alert("Date is not valid");
  };
  useEffect(() => {
    console.log(fileType);
  }, [fileType]);
  return (
    <div className="addCarForm">
      <div className="addCar-title">
        <h2>Add vehicle</h2>
      </div>
      <form onSubmit={addVehicle}>
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          required
          margin="dense"
        ></TextField>
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="passagers">Ammount of passagers</InputLabel>
          <Select
            labelId="passagers"
            id="passagersSelect"
            value={passengerCapacity}
            label="Ammount of passagers"
            onChange={(event) => setPassengerCapacity(event.target.value)}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="gearBox">GearBox</InputLabel>
          <Select
            labelId="gearBox"
            id="gearBoxSelect"
            label="GearBox"
            value={transmissionType}
            onChange={(event) => setTransmissionType(event.target.value)}
          >
            <MenuItem value={"Manual"}>Manual</MenuItem>
            <MenuItem value={"Automatic"}>Automatic</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-name"
          label="Fuel Consumption per 1 Litre"
          type="number"
          value={fuelConsumption}
          onChange={(event) => setFuelConsumption(event.target.value)}
          fullWidth
          required
          margin="dense"
        ></TextField>
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="vehicleType">Vehicle Type</InputLabel>
          <Select
            labelId="vehicleType"
            id="vehicleTypeSelect"
            label="VehicleType"
            value={vehicleType}
            onChange={(event) => setVehicleType(event.target.value)}
          >
            <MenuItem value={"Car"}>Car</MenuItem>
            <MenuItem value={"Motorcycle"}>Motorcycle</MenuItem>
            <MenuItem value={"Delivery"}>Delivery</MenuItem>
            <MenuItem value={"Agricultural"}>Agricultural</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="fuelType">Fuel Type</InputLabel>
          <Select
            labelId="fuelType"
            id="fuelTypeSelect"
            label="fuelType"
            value={fuelType}
            onChange={(event) => setFuelType(event.target.value)}
          >
            <MenuItem value={"LPG"}>LPG</MenuItem>
            <MenuItem value={"ON"}>ON</MenuItem>
            <MenuItem value={"PB"}>PB</MenuItem>
            <MenuItem value={"Electrical"}>Electrical</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-name"
          label="Price per Day"
          type="number"
          value={pricePerDay}
          onChange={(event) => setPricePerDay(event.target.value)}
          fullWidth
          required
          margin="dense"
        ></TextField>
        <TextField
          id="outlined-name"
          label="Phone Number"
          type="number"
          placeholder="+48 123 123 123"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          fullWidth
          required
          margin="dense"
        ></TextField>
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="city">City</InputLabel>
          <Select
            labelId="city"
            id="citySelect"
            label="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            <MenuItem value={"Warszawa"}>Warszawa</MenuItem>
            <MenuItem value={"Wrocław"}>Wrocław</MenuItem>
            <MenuItem value={"Poznań"}>Poznań</MenuItem>
            <MenuItem value={"Kraków"}>Kraków</MenuItem>
            <MenuItem value={"Częstochowa"}>Częstochowa</MenuItem>
          </Select>
        </FormControl>
        <label htmlFor="startingDate">
          Choose your starting date, when your vehicle is available
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label htmlFor="endingDate">
          Choose your ending of availablity date
        </label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <div className="formAlert"> <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Invalid file type! Your image should be img/jpeg or jpg.
            </Alert>
          </Collapse></div>
        <div className="addCarButton">
         
          <Button variant="contained" component="label">
            Image upload
            <input
              hidden
              accept="image/jpg, image/jpeg, image/jpg"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </Button>
          <Button
            variant="contained"
            type="submit"
            endIcon={<i className="fa-solid fa-paper-plane"></i>}
            color="secondary"
          >
            Add vehicle
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddCarForm;
