import { OptionData } from '../../typings';

export interface AddNewYarnStockPayload extends AddUpdateYarnStockPayload {
  quantity: number;
}

export type UpdateYarnStockPayload = AddUpdateYarnStockPayload &
DeleteYarnStockPayload;

export interface DeleteYarnStockPayload {
  yarnId: number;
}

export interface AddUpdateYarnStockPayload {
  yarnCategory: OptionData;
  yarnColorCategory: OptionData;
  detailedColor: string;
  cost: number;
  reorderLevel: number;
  lastOrderedDate?: Date;
  image?: string | null;
}

export interface GetYarnStockPayload {
  yarnCategoryIds: number[];
  yarnColorCategoryIds: number[];
}

export interface UpdateYarnQuantityPayload {
  yarnId: number;
  quantity: number;
}

export interface StockData {
  id: number;
  yarnCategory: OptionData;
  yarnColorCategory: OptionData;
  detailedColor: string;
  costPerItem: number;
  inStockQuantity: number;
  usedQuantity: number;
  reorderLevel: number;
  lastOrderedAt: Date;
  reorderStatus: 'Reorder' | 'Optimum';
}

export interface AddNewYarnCategoryPayload {
  name: string;
}

export interface DeleteYarnCategoryPayload {
  id: number;
}

export type UpdateYarnCategoryPayload = AddNewYarnCategoryPayload &
DeleteYarnCategoryPayload;

export type AddNewYarnColorCategoryPayload = AddNewYarnCategoryPayload;

export type DeleteYarnColorCategoryPayload = DeleteYarnCategoryPayload;

export type UpdateYarnColorCategoryPayload = AddNewYarnColorCategoryPayload &
DeleteYarnColorCategoryPayload;
