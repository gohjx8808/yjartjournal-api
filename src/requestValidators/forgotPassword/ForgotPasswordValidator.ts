import { body } from "express-validator";
import customValidator from "../customValidator";

const ForgotPasswordValidator = customValidator([
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email."),
]);

export default ForgotPasswordValidator;
