import { OptionData } from '../../typings';

export interface AddAddressPayload {
  receiverName: string;
  receiverCountryCode: string;
  receiverPhoneNumber: string;
  addressLineOne: string;
  addressLineTwo?: string;
  postcode: string;
  city: string;
  state: OptionData;
  country: string;
  isDefault: boolean;
  tag?: string;
}

export interface UpdateAddressPayload extends AddAddressPayload {
  addressId: number;
}

export interface DeleteAddressPayload {
  addressId: number;
}
