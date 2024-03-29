import { OptionData } from '../../typings';

export interface AddNewYarnStockPayload extends AddUpdateYarnStockPayload {
  quantity: number;
}

export interface UpdateYarnStockPayload
  extends AddUpdateYarnStockPayload,
  DeleteYarnStockPayload {
  isImageUpdated: boolean;
}

export interface DeleteYarnStockPayload {
  yarnId: number;
}

export interface AddUpdateYarnStockPayload {
  yarnCategoryId: number;
  yarnColorCategoryId: number;
  name: string;
  cost: number;
  reorderLevel: number;
  lastOrderedDate?: Date;
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
  name: string;
  costPerItem: number;
  inStockQuantity: number;
  usedQuantity: number;
  reorderLevel: number;
  lastOrderedAt?: Date;
  reorderStatus: 'Reorder' | 'Optimum';
  yarnStockImages?: StockImage[];
}

interface StockImage {
  id: number;
  cloudinaryId: string;
  originalName: string;
  imageUrl: string;
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

export interface UpdatedImageData {
  url: string | null;
  id: string | null;
}
