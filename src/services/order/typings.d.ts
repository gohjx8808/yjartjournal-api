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
  state?: string;
  country?: string;
  promoCodeUsed?: string;
  note?: string;
  addToAddressBook: boolean;
  paymentOption: 'TNG' | 'Bank Transfer';
  totalAmount: number;
}

export interface CheckoutProductData {
  id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}
