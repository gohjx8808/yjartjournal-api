import { OptionData } from '../../typings';

export interface AddNewYarnStockPayload {
  yarnCategory: OptionData;
  yarnColorCategory: OptionData;
  detailedColor: string;
  cost: number;
  quantity: number;
  reorderLevel: number;
  lastOrderedDate?: Date;
}
