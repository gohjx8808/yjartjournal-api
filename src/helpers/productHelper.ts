import { ProductSort } from '../constants/productConstants';

export const getContentfulOrderByKeyword = (sortById:number)=> {
  switch (+sortById) {
    case ProductSort.A_TO_Z:
      return 'fields.name';
    case ProductSort.Z_TO_A:
      return '-fields.name';
    case ProductSort.LOW_TO_HIGH:
      return 'fields.price';
    case ProductSort.HIGH_TO_LOW:
      return '-fields.price';
  }
};