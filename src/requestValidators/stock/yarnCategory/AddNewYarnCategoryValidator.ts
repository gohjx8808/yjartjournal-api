import { body } from "express-validator";
import customValidator from "../../customValidator";

const AddNewYarnCategoryValidator = customValidator([
  body("name")
    .notEmpty()
    .withMessage("Yarn category name is required.")
    .isString()
    .withMessage("Invalid yarn category name."),
]);

export default AddNewYarnCategoryValidator;
