import { createClient } from 'contentful';
import { manager } from '../../dataSource';
import SortOptions from '../../entities/SortOptions';
import { getContentfulOrderByKeyword, randomizeImages } from '../../helpers/productHelper';
import { GalleryData, GetAllProductsPayload, PickedProductImageData, ProductData, RawGalleryData, RawProductData } from './typings';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getProductCategories = async ()=>{
  const productCategories = await client
    .getEntries<RawProductData>({
    content_type: 'products',
    select:'fields.category',
  }).then((entries) =>
    entries.items.map((entry) => {
      const data = entry.fields;

      return data.category;
    }),
  );

  return [...new Set(productCategories)].sort();
};

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
          pickedData = data.productImage.map((image) => {
            const imageFile = image.fields.file;
            return { url: imageFile.url, filename: imageFile.fileName };
          });
        }
        delete data.productImage;

        return {
          ...data,
          id: entry.sys.id,
          contentDescription: data.contentDescription,
          productImages: pickedData,
        };
      }),
    );
};

export const getSortOptions = async () => {
  return (await manager.find(SortOptions)).map((option) => ({
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
