import React, { useEffect, useState } from "react";
import "./booking.css";
import BookingSearch from "../../components/bookingSearch/bookingSearch";
import ReadPopularFeature from "../../components/readpopularfeature/readpopularfeature";
import { stockCars } from "../../data";
import { useLocation } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import BookingPopularFeature from "../../components/bookingPopularFeature/bookingpopularfeature";
import PopularFeature from "../../components/popularfeature/popularfeature";

function Booking() {
  const params = useLocation();
  function check(vehicle, startDate, endDate) {
    console.log("wchodze w funkcje check dla auta", vehicle.name);
    if (vehicle.termsStart?.length === 0) {
      console.log(
        "Wchodze do warunku gdzie samochod ma pusta tablice w termsach"
      );
      return true;
    }
    for (let i = 0; i < vehicle.termsStart?.length; i++) {
      if (
        startDate >= vehicle.termsEnd[i].seconds &&
        endDate >= vehicle.termsStart[i].seconds
      ) {
        console.log("sprawdzenie");
      } else {
        console.log("zarezerwowane");
        return false;
      }
    }
    console.log("Funckja check bez warunkow lub sprawdzenie only true");
    return true;
  }
  const [vehicles, setVehicles] = useState();
  const fetchPost = async () => {
    await getDocs(collection(db, "vehicles")).then((QuerySnapshot) => {
      const newData = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(0),
        id: doc.id,
      }));
      const newDataFiltered = newData.filter(
        (vehicle) =>
          vehicle.city === params.state.city &&
          vehicle.vehicleType === params.state.vehicleType &&
          vehicle.startDate.seconds <=
            params.state.startDate.getTime() / 1000 &&
          vehicle.endDate.seconds >= params.state.endDate.getTime() / 1000 &&
          check(
            vehicle,
            params.state.startDate.getTime() / 1000,
            params.state.endDate.getTime() / 1000
          )

        // for(let i =0; i< vehicle.termsStart.length;i++){
        //   (params.state.startDate.getTime()/1000 > vehicle.termsEnd.seconds || params.state.endDate.getTime()/1000 > vehicle.termsStart.seconds)
        // }
        // new Date(vehicle.startDate.seconds*1000) <= params.state.startDate &&
        // new Date(vehicle.endDate.seconds*1000) >= params.state.endDate
      );
      //console.log("DAta",newDataFiltered[0].startDate)
      // console.log("Data vehicle: ", new Date(newDataFiltered[0].startDate.seconds*1000), "Data paramsa:", params.state.startDate)
      // console.log("Porownuje vehicle: ", newDataFiltered[0].startDate.seconds, "do paramsa: ", params.state.startDate.getTime()/1000, "TestDataVehicle")
      // console.log(newDataFiltered[0].startDate.seconds > params.state.startDate.getTime()/1000)

      //console.log("Filter: ", newDataFiltered)
      //console.log(newDataFiltered.length)

      if (newDataFiltered.length > 0) {
        setVehicles(newDataFiltered);
      } else {
        console.log("Nie wpisalem aut");
        setVehicles(undefined);
      }
    });
  };

  useEffect(() => {
    console.log(
      params.state.city,
      params.state.vehicleType,
      params.state.startDate,
      params.state.endDate
    );
    fetchPost();
  }, [params]);
  return (
    <div>
      <div className="cr_booking__header">
        <div className="cr_booking__header-searchbar">
          <BookingSearch></BookingSearch>
        </div>
      </div>
      <div className="cr_booking_body">
        <div className="cr_booking_body_carlist">
          <div className="cr_booking_body_carlist_row">
            {vehicles ? (
              vehicles.map((data) => (
                <BookingPopularFeature data={data} key={data.id} />
              )) 
            ) : (
              <div> <h2>Brak dostępnych pojazdów</h2>  </div>
            )}
            
           
          </div>
          {/* <div className="cr_booking_body_carlist_row">
          {stockCars.map((data) => (
          <PopularFeature data={data} key={data.id}/>
        ))}
          </div>
          <div className="cr_booking_body_carlist_row">
          {stockCars.map((data) => (
          <PopularFeature data={data} key={data.id}/>
        ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Booking;
