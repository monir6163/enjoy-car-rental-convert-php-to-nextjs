import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // data added
export const useAppSelector = useSelector.withTypes<RootState>(); // data get
export const useAppStore = useStore.withTypes<AppStore>();
