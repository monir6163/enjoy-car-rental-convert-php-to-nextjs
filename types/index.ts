export interface Props {
  children: React.ReactNode;
}

export interface IsSignupFromType {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IsLoginFormType {
  email: string;
  password: string;
}

export interface CountryGetAllType {
  id?: string;
  name?: string;
  code?: string;
  longitude?: number;
  latitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegionGetAllType extends CountryGetAllType {}

export interface IBaseProviderProps {
  id: string;
  businessRegistrationNumber: string;
  city: string;
  companyName: string;
  contactName: string;
  email: string;
  latitude: number;
  longitude: number;
  phone: string;
  avatar: string;
  profileUrl?: string;
  street: string;
}

export interface IReqProviderProps extends IBaseProviderProps {
  country_id: number;
  region_id: number;
}

export const initialCompanyDetails: Partial<IReqProviderProps> = {
  profileUrl: "",
  companyName: "",
  businessRegistrationNumber: "",
  contactName: "",
  phone: "",
  email: "",
  country_id: -1,
  region_id: -1,
  city: "",
  street: "",
  latitude: -1,
  longitude: -1,
};

export type CurrentMode = "new" | "edit";

export interface IBaseLocationProps {
  name: string;
  latitude?: number;
  longitude?: number;
}

export interface IResCountryProps extends IBaseLocationProps {
  id: number;
  created_at: string;
}
