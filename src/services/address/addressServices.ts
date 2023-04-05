import {
  deleteAddressById,
  getAddressWithExactDetails,
  getAddressWithExactDetailsExceptSelf,
  getUserAddressById,
  getUserAdresses,
  insertNewAddress,
  updateAddressById,
  updateAddressDefaultToFalse,
} from "../../repositories/addressRepository";
import {
  AddAddressPayload,
  DeleteAddressPayload,
  UpdateAddressPayload,
} from "./typings";

export const validateTag = (tag: string) => {
  if (tag !== "Work" && tag !== "Home") {
    return false;
  }
  return true;
};

export const isAddressIdExist = async (userId: number, addressId: number) => {
  const addressAvailable = await getUserAddressById(userId, addressId);

  return !!addressAvailable;
};

export const getAddressList = async (userId: number) => {
  const existingAddresses = await getUserAdresses(userId);

  return existingAddresses;
};

export const updateOtherAddressDefaultToFalse = async (userId: number) => {
  const existingAddresses = await getAddressList(userId);
  existingAddresses.map(async (address) => {
    await updateAddressDefaultToFalse(address.id);
  });
};

export const oneDefaultAddressOnly = async (
  userId: number,
  payload: AddAddressPayload | UpdateAddressPayload
) => {
  payload.isDefault = Boolean(payload.isDefault);
  if (payload.isDefault === true) {
    await updateOtherAddressDefaultToFalse(userId);
  }
};

export const addAddress = async (
  userId: number,
  payload: AddAddressPayload
) => {
  await oneDefaultAddressOnly(userId, payload);
  const response = await insertNewAddress(payload, userId);

  return response;
};

export const isAddressExist = async (
  userId: number,
  payload: AddAddressPayload
) => {
  const existingAddresses = await getAddressWithExactDetails(userId, payload);

  return { id: existingAddresses?.id, exist: !!existingAddresses };
};

export const isAddressExistExceptSelf = async (
  userId: number,
  payload: UpdateAddressPayload
) => {
  const existingAddressesExceptSelf =
    await getAddressWithExactDetailsExceptSelf(userId, payload);

  return !!existingAddressesExceptSelf;
};

export const updateAddress = async (
  userId: number,
  payload: UpdateAddressPayload
) => {
  await oneDefaultAddressOnly(userId, payload);

  const response = await updateAddressById(payload);

  return response;
};

export const deleteAddress = async (payload: DeleteAddressPayload) => {
  const response = await deleteAddressById(payload.addressId);

  return response;
};
