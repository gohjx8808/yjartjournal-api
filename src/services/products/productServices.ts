import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { createClient } from 'contentful';
import { dataSource } from '../../dataSource';
import SortOptions from '../../entities/SortOptions';
import { getContentfulOrderByKeyword, groupByCategory, randomizeImages } from '../../helpers/productHelper';
import {
  GalleryData,
  GetAllProductsPayload,
  PickedProductImageData,
  ProductData,
  RawGalleryData,
  RawProductData,
} from './typings';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getProductCategories = async ()=>{
  const productData = await client
    .getEntries<RawProductData>({
    content_type: 'products',
    select:'fields.category',
  }).then((entries) =>
    entries.items.map((entry) => {
      const data = entry.fields;

      return data.category;
    }),
  );

  return [...new Set(productData)].sort();
};

export const getAllProducts = async (
  payload: GetAllProductsPayload,
): Promise<ProductData[]> => {
  const sortOrder = getContentfulOrderByKeyword(payload.sortId);
  const productData = await client
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
          pickedData = data.productImage.map((image) => {
            const imageFile = image.fields.file;
            return { url: imageFile.url, fileName: imageFile.fileName };
          });
        }

        return {
          ...data,
          id: entry.sys.id,
          contentDescription: documentToHtmlString(data.contentDescription),
          productImage: pickedData,
        };
      }),
    );

  return groupByCategory(productData);
};

export const getSortOptions = async () => {
  return (await dataSource.manager.find(SortOptions)).map((option) => ({
    label: option.name,
    value: option.id,
  }));
};

export const getAllImages = async (): Promise<GalleryData[]> => {
  const assets = await client.getEntries<RawGalleryData>({
    content_type: 'gallery',
  });

  return randomizeImages(assets.items);
};
