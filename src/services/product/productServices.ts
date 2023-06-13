import { EntrySkeletonType, createClient } from 'contentful';
import {
  getContentfulOrderByKeyword,
  randomizeImages,
} from '../../helpers/productHelper';
import {
  GalleryData,
  GetAllProductsPayload,
  PickedProductImageData,
  RawGalleryData,
  RawProductData,
} from './typings';
import { ProductSort } from '../../constants/productConstants';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export const getProductCategories = async () => {
  const productCategories = await client.withoutUnresolvableLinks
    .getEntries<EntrySkeletonType<RawProductData, 'products'>>({
    content_type: 'products',
    select: ['fields.category'],
  })
    .then((entries) =>
      entries.items.map((entry) => {
        const data = entry.fields;

        return data.category;
      }),
    );

  return [...new Set(productCategories)].sort();
};

export const getAllProducts = async (payload: GetAllProductsPayload) => {
  const sortOrder = getContentfulOrderByKeyword(payload.sortId);
  const productEntries = await client.withoutUnresolvableLinks.getEntries<
  EntrySkeletonType<RawProductData, 'products'>
  >({
    'fields.name[match]': payload.search,
    content_type: 'products',
    order: [sortOrder],
  });

  if (+payload.sortId === ProductSort.A_TO_Z) {
    productEntries.items = productEntries.items.sort((a, b) => {
      if (a.fields.name < b.fields.name) {
        return -1;
      }
      if (a.fields.name > b.fields.name) {
        return 1;
      }
      return 0;
    });
  } else if (+payload.sortId === ProductSort.Z_TO_A) {
    productEntries.items = productEntries.items.sort((a, b) => {
      if (a.fields.name < b.fields.name) {
        return 1;
      }
      if (a.fields.name > b.fields.name) {
        return -1;
      }
      return 0;
    });
  }

  return productEntries.items.map((entry) => {
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
  });
};

export const getAllImages = async (): Promise<GalleryData[]> => {
  const assets = await client.withoutUnresolvableLinks.getEntries<
  EntrySkeletonType<RawGalleryData, 'gallery'>
  >({
    content_type: 'gallery',
  });

  return randomizeImages(assets.items);
};
