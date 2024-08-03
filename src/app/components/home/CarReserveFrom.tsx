const CarReserveFrom = () => {
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

        <div className="buttons">
          <button className="red_btn w-full text-white text-xl border border-white rounded">
            Book now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarReserveFrom;
