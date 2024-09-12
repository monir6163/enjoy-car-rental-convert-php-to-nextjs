"use client";

import { Button } from "@mantine/core";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../cars/DatePicker";
import CarModel from "./filterFrom/CarModel";
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
      <div className="">
        <h2 className="mb-5 font-bold text-3xl">Car Reservation</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <SelectCountry />
        <SelectCity />
        <ReturnLocation />
        <CarModel />
        <DatePicker />
        <div className="buttons">
          <Button type="submit" variant="gradient" className="w-full" size="md">
            Search for car
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarReserveFrom;
