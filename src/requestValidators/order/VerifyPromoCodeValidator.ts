import { body } from "express-validator";
import customValidator from "../customValidator";

const VerifyPromoCodeValidator = customValidator([
  body("promoCode").notEmpty().withMessage("Promo code is required."),
]);

export default VerifyPromoCodeValidator;
