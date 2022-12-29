import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { createClient } from 'contentful';
import { getContentfulOrderByKeyword } from '../../helpers/productHelper';
import {
  GetAllProductsPayload,
  PickedProductImageData,
  ProductData,
  RawProductData,
} from './typings';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getAllProducts = async (
  payload: GetAllProductsPayload,
): Promise<ProductData[]> => {
  const sortOrder = getContentfulOrderByKeyword(payload.sortId);
  return client
    .getEntries<RawProductData>({
    'fields.name[match]': payload.search,
    content_type: 'products',
    order: sortOrder,
  })
    .then((entries) =>
      entries.items.map((entry) => {
        const data = entry.fields;
        let pickedData: PickedProductImageData[] = [];
        if (data.productImage) {
          pickedData = data.productImage.map((image) => image.fields);
        }

        return {
          ...data,
          id: entry.sys.id,
          contentDescription: documentToHtmlString(data.contentDescription),
          productImage: pickedData,
        };
      }),
    );
};

export const getAllImages = async () => {
  const assets = await client.getAssets();
  return assets.items.map((asset) => asset.fields);
}; 
