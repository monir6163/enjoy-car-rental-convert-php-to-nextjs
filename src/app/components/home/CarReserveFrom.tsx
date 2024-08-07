"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarReserveFrom = () => {
  const [pickup_date, setPickupdate] = useState(null);
  const [return_date, setReturnDate] = useState(null);
  const [pickup_time, setPickupTime] = useState(null);
  const [return_time, setReturnTime] = useState(null);

  const addMonths = (date: Date, months: number) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };
  return (
    <div className="carReservation">
      <h2 className="mb-5 font-bold text-3xl">Car Reservation</h2>
      <form action="">
        <select className="w-full" name="location" id="location">
          <option value="">Pickup Location</option>
          <option value="usa">United States</option>
          <option value="serbia">Serbia</option>
          <option value="bd">Bangladesh</option>
        </select>
        <select
          className="w-full"
          name="returning_location"
          id="returning_location"
        >
          <option value="">Returning Location</option>
          <option value="usa">United States</option>
          <option value="serbia">Serbia</option>
          <option value="bd">Bangladesh</option>
        </select>
        <select className="w-full" name="car_model" id="car_model">
          <option value="">Car Model</option>
          <option value="dis">Discover</option>
          <option value="pul">Pulser</option>
          <option value="ap">Apache</option>
        </select>
        <div>
          <DatePicker
            className="w-full pick-input-date"
            name="pickup_date"
            id="pickup_date"
            placeholderText="Pickup Date"
            selected={pickup_date}
            onChange={(date) => setPickupdate(date as any)}
            openToDate={new Date()}
            showDisabledMonthNavigation
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            todayButton="Today"
            isClearable
          />
        </div>
        <div>
          <DatePicker
            className="w-full pick-input-time"
            selected={pickup_time}
            onChange={(date) => setPickupTime(date as any)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Pickup Time"
          />
        </div>

        <div>
          <DatePicker
            className="w-full pick-input-date"
            name="return_date"
            id="return_date"
            placeholderText="Return Date"
            selected={return_date}
            onChange={(date) => setReturnDate(date as any)}
            openToDate={new Date()}
            showDisabledMonthNavigation
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            todayButton="Today"
            isClearable
          />
        </div>
        <div>
          <DatePicker
            className="w-full pick-input-time"
            selected={return_time}
            onChange={(date) => setReturnTime(date as any)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Return Time"
          />
        </div>

        <div className="buttons">
          <button className="red_btn btn w-full text-white text-xl border border-white rounded">
            Book now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarReserveFrom;
