import { body } from "express-validator";
import customValidator from "../customValidator";

const UpdateStockQuantityValidator = customValidator([
  body("yarnId")
    .notEmpty()
    .withMessage("Yarn id is required.")
    .isInt()
    .withMessage("Invalid yarn id."),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt()
    .withMessage("Invalid quantity."),
]);

export default UpdateStockQuantityValidator;
