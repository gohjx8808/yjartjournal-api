import { OptionData } from '../../typings';

export interface VerifyPromoCodePayload {
  promoCode: string;
}

export interface CheckoutPayload {
  products: CheckoutProductData[];
  addressId?: number;
  buyerEmail: string;
  receiverName?: string;
  receiverCountryCode?: string;
  receiverPhoneNumber?: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  postcode?: string;
  city?: string;
  state?: OptionData;
  country?: string;
  shippingFee: number;
  promoCodeUsedId?: number;
  note?: string;
  paymentOption: 'TNG' | 'Bank Transfer';
  totalAmount: number;
}

export interface CheckoutProductData {
  id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

export interface CalculateShippingFeePayload {
  state: OptionData;
  totalAmount: number;
}
