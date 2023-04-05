import { getUserById, updateUserById } from "../../repositories/userRepository";
import { UpdateAccountPayload } from "./typings";

export const getUserAccount = async (userId: number) => {
  const userDetails = await getUserById(userId);

  return userDetails;
};

export const updateUserAccount = async (
  userId: number,
  payload: UpdateAccountPayload
) => {
  const result = await updateUserById(userId, payload);

  return result;
};
