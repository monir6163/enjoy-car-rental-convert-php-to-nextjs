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
