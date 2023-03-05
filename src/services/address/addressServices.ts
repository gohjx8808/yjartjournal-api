import Users from '../../entities/Users';
import {
  deleteAddressById,
  getAddressWithExactDetails,
  getAddressWithExactDetailsExceptSelf,
  getUserAddressById,
  getUserAdresses,
  insertNewAddress,
  updateAddressById,
  updateAddressDefaultToFalse,
} from '../../repositories/addressRepository';
import {
  AddAddressPayload,
  DeleteAddressPayload,
  UpdateAddressPayload,
} from './typings';

export const validateTag = (tag: string) => {
  if (tag !== 'Work' && tag !== 'Home') {
    return false;
  }
  return true;
};

export const isAddressIdExist = async (user: Users, addressId: number) => {
  const addressAvailable = await getUserAddressById(user, addressId);

  return !!addressAvailable;
};

export const getAddressList = async (user: Users) => {
  const existingAddresses = await getUserAdresses(user);

  return existingAddresses;
};

export const updateOtherAddressDefaultToFalse = async (user: Users) => {
  const existingAddresses = await getAddressList(user);
  existingAddresses.map(async (address) => {
    await updateAddressDefaultToFalse(address.id);
  });
};

export const oneDefaultAddressOnly = async (
  user: Users,
  payload: AddAddressPayload | UpdateAddressPayload,
) => {
  payload.isDefault = Boolean(payload.isDefault);
  if (payload.isDefault === true) {
    await updateOtherAddressDefaultToFalse(user);
  }
};

export const addAddress = async (user: Users, payload: AddAddressPayload) => {
  await oneDefaultAddressOnly(user, payload);
  const response = await insertNewAddress(payload, user);

  return response;
};

export const isAddressExist = async (
  user: Users,
  payload: AddAddressPayload,
) => {
  const existingAddresses = await getAddressWithExactDetails(user, payload);

  return { id: existingAddresses?.id, exist: !!existingAddresses };
};

export const isAddressExistExceptSelf = async (
  user: Users,
  payload: UpdateAddressPayload,
) => {
  const existingAddressesExceptSelf =
    await getAddressWithExactDetailsExceptSelf(user, payload);

  return !!existingAddressesExceptSelf;
};

export const updateAddress = async (
  user: Users,
  payload: UpdateAddressPayload,
) => {
  await oneDefaultAddressOnly(user, payload);

  const response = await updateAddressById(payload);

  return response;
};

export const deleteAddress = async (payload: DeleteAddressPayload) => {
  const response = await deleteAddressById(payload.addressId);

  return response;
};
