import React from "react";
import "./howWork.css";
import HowWorkFeature from "../../components/howWorkFeature/HowWorkFeature";
function howWork() {
  return (
    <div className="cr_howWork section__margin" id="howWork">
      <div className="cr_howWork-title">
        <h1>How it work</h1>
      </div>
      <div className="cr_howWork-text">
        <p>
          From its medieval origins to the digital era. Easily build waiting
          rooms
        </p>
        <p className="p2">readable English many desktop publishing.</p>
      </div>
      <div className="cr_howWork-feature">
        <HowWorkFeature
          icon="fa-solid fa-location-pin fa-2xl"
          title="Choose Location"
          text="From its medieval origins to the digital era. Easily build waiting
          rooms"
        />
        <HowWorkFeature 
          icon="fa-solid fa-calendar-days fa-2xl"
          title="Pick Up Date"
          text="From its medieval origins to the digital era. Easily build waiting
          rooms"
        />
        <HowWorkFeature 
          icon="fa-solid fa-car fa-2xl"
          title="Book your Car"
          text="From its medieval origins to the digital era. Easily build waiting
          rooms"
        />
      </div>
    </div>
  );
}

export default howWork;
