"use client";

import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MapModal from "../shared/Map/MapModal";
import CarModel from "./filterFrom/CarModel";
import PicupDate from "./filterFrom/PicupDate";
import ReturnLocation from "./filterFrom/ReturnLocation";
import SelectCity from "./filterFrom/SelectCity";
import SelectCountry from "./filterFrom/SelectCountry";
const CarReserveFrom = () => {
  const [pickup_date, setPickupdate] = useState<Date | null>(null);
  const [return_date, setReturnDate] = useState(null);
  const [pickup_time, setPickupTime] = useState(null);
  const [return_time, setReturnTime] = useState(null);

  const addMonths = (date: Date, months: number) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      location: formData.get("location"),
      returning_location: formData.get("returning_location"),
      car_model: formData.get("car_model"),
      pickup_date: pickup_date,
      return_date: return_date,
      pickup_time: pickup_time,
      return_time: return_time,
    };
    console.log(data);
  };

  return (
    <div className="carReservation">
      <div className="flex justify-between">
        <h2 className="mb-5 font-bold text-3xl">Car Reservation</h2>
        <MapModal />
      </div>
      <form onSubmit={handleSubmit}>
        <SelectCountry />
        <SelectCity />
        <ReturnLocation />
        <CarModel />
        <PicupDate palceholder="Pickup Date" />
        <PicupDate palceholder="Return Date" />
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
