"use client";

import { DateValue } from "@mantine/dates";
import { createContext, useCallback, useContext, useState } from "react";
import { CountryGetAllType, RegionGetAllType } from "../../types";
interface AppState {
  selectedCountry: CountryGetAllType | undefined;
  selectedRegion: RegionGetAllType | undefined;
  carModel: { label: string; value: string } | undefined;
  picupDate: DateValue | undefined;
  returnDate: DateValue | undefined;
}
interface IAppContext {
  state: AppState;
  setCountry: (selectedCountry: CountryGetAllType) => void;
  setRegion: (selectedRegion: RegionGetAllType) => void;
  setCarModel: (carModel: { label: string; value: string }) => void;
  setPicupDate: (picupDate: DateValue) => void;
  setReturnDate: (returnDate: DateValue) => void;
}

const AppContext = createContext<IAppContext>(undefined as any);

const initialState: AppState = {
  selectedCountry: undefined,
  selectedRegion: undefined,
  carModel: undefined,
  picupDate: undefined,
  returnDate: undefined,
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<AppState>(initialState);
  const setCountry = useCallback((selectedCountry: CountryGetAllType) => {
    setState((prevState) => ({ ...prevState, selectedCountry }));
  }, []);
  const setRegion = useCallback((selectedRegion: RegionGetAllType) => {
    setState((prevState) => ({ ...prevState, selectedRegion }));
  }, []);
  const setCarModel = useCallback(
    (carModel: { label: string; value: string }) => {
      setState((prevState) => ({ ...prevState, carModel }));
    },
    []
  );
  const setPicupDate = useCallback((picupDate: DateValue) => {
    setState((prevState) => ({ ...prevState, picupDate }));
  }, []);
  const setReturnDate = useCallback((returnDate: DateValue) => {
    setState((prevState) => ({ ...prevState, returnDate }));
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        setCountry,
        setRegion,
        setCarModel,
        setPicupDate,
        setReturnDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
