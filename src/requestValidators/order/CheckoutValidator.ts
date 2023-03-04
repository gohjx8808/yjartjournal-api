import { body, oneOf } from 'express-validator';
import customValidator from '../customValidator';

const CheckoutValidator = customValidator(
  [
    body('products.*')
      .notEmpty()
      .withMessage('At least one product is required.'),
    body('products.*.id').notEmpty().withMessage('Product ID is required.'),
    body('products.*.name').notEmpty().withMessage('Product name is required.'),
    body('products.*.quantity')
      .notEmpty()
      .withMessage('Product quantity is required.')
      .isInt()
      .withMessage('Invalid product quantity.'),
    body('products.*.totalPrice')
      .notEmpty()
      .withMessage('Total price of product is required.')
      .isFloat()
      .withMessage('Invalid total price of product.'),
    body('buyerEmail')
      .notEmpty()
      .withMessage('Buyer email is required.')
      .isEmail()
      .withMessage('Invalid buyer email.'),
    body('shippingFee')
      .notEmpty()
      .withMessage('Shipping fee is required.')
      .isInt()
      .withMessage('Invalid shipping fee.'),
    body('promoCodeUsed')
      .optional({ nullable: true })
      .isObject()
      .withMessage('Invalid promo code.'),
    body('note')
      .optional({ nullable: true })
      .isString()
      .withMessage('Invalid note.'),
    body('addToAddressBook')
      .notEmpty()
      .withMessage('Add to address book is required.')
      .isBoolean()
      .withMessage('Invalid add to address book option.'),
    body('paymentOption')
      .notEmpty()
      .withMessage('Payment option is required.')
      .matches(/^\b(TNG|Bank Transfer)\b$/)
      .withMessage('Invalid payment option.'),
    body('totalAmount')
      .notEmpty()
      .withMessage('Total amount is required.')
      .isFloat()
      .withMessage('Invalid total amount.'),
  ],
  oneOf([
    [
      body('receiverName')
        .notEmpty()
        .withMessage('Receiver name is required.')
        .isString()
        .withMessage('Invalid receiver name.'),
      body('receiverCountryCode')
        .notEmpty()
        .withMessage('Receiver country code is required.')
        .isInt()
        .withMessage('Invalid receiver country code.'),
      body('receiverPhoneNumber')
        .notEmpty()
        .withMessage('Receiver phone number is required.')
        .isInt()
        .withMessage('Invalid receiver phone number.'),
      body('addressLineOne')
        .notEmpty()
        .withMessage('Address line one is required.')
        .isString()
        .withMessage('Invalid address line one.'),
      body('addressLineTwo')
        .optional({ nullable: true })
        .isString()
        .withMessage('Invalid address line two.'),
      body('postcode')
        .notEmpty()
        .withMessage('Postcode is required.')
        .isInt()
        .withMessage('Invalid postcode.'),
      body('city')
        .notEmpty()
        .withMessage('City is required.')
        .isString()
        .withMessage('Invalid city.'),
      body('state')
        .notEmpty()
        .withMessage('State is required.')
        .isObject()
        .withMessage('Invalid state.'),
      body('country')
        .notEmpty()
        .withMessage('Country is required.')
        .isString()
        .withMessage('Invalid country.')
        .matches(/^\bMalaysia\b$/)
        .withMessage('Only Malaysia is allowed.'),
    ],
    body('addressId')
      .notEmpty()
      .withMessage('Address ID is required.')
      .isInt()
      .withMessage('Invalid address ID'),
  ]),
);

export default CheckoutValidator;
