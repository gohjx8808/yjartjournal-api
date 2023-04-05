import { body } from "express-validator";
import customValidator from "../../customValidator";

const UpdateYarnColorCategoryValidator = customValidator([
  body("id")
    .notEmpty()
    .withMessage("Yarn color category id is required.")
    .isInt()
    .withMessage("Invalid yarn color category id."),
  body("name")
    .notEmpty()
    .withMessage("Yarn color category name is required.")
    .isString()
    .withMessage("Invalid yarn color category name."),
]);

export default UpdateYarnColorCategoryValidator;
