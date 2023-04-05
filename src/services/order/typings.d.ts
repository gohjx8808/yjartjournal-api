import { OptionData } from "../../typings";

export interface VerifyPromoCodePayload {
  promoCode: string;
}

export interface CheckoutPayload extends OrderInsertPayload {
  products: CheckoutProductData[];
  addressId?: number;
  receiverName?: string;
  receiverCountryCode?: string;
  receiverPhoneNumber?: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  postcode?: string;
  city?: string;
  state?: OptionData;
  country?: string;
  addToAddressBook: boolean;
}

export interface CheckoutProductData {
  productId: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

export interface CalculateShippingFeePayload {
  state: OptionData;
  totalAmount: number;
}

export interface OrderInsertPayload {
  buyerEmail: string;
  shippingFee: number;
  promoCodeUsed?: OptionData;
  note?: string;
  paymentMethod: "TNG" | "Bank Transfer";
  totalAmount: number;
}
