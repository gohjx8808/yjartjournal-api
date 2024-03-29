import { Entry, EntrySkeletonType } from 'contentful';
import { GalleryData, RawGalleryData } from '../services/product/typings';
import { ProductSort } from '../entities/SortOptions';

export const getContentfulOrderByKeyword = (sortById: number) => {
  switch (+sortById) {
    case ProductSort.LOW_TO_HIGH:
      return 'fields.price';
    case ProductSort.HIGH_TO_LOW:
      return '-fields.price';
  }
};

export const separateLargeSmallImages = (
  assetItems: Entry<
  EntrySkeletonType<RawGalleryData, 'gallery'>,
  'WITHOUT_UNRESOLVABLE_LINKS',
  string
  >[],
) => {
  let regularProductImages: GalleryData[] = [];
  let largeProductImages: GalleryData[] = [];

  assetItems.map((asset) => {
    const assetFields = asset.fields;
    const formattedImages = assetFields.productPhoto1.map((image) => {
      const imageFile = image.fields.file;
      return {
        image: { filename: imageFile.fileName, url: imageFile.url },
        row: assetFields.row,
        column: assetFields.column,
      };
    });

    if (assetFields.row === 1) {
      regularProductImages = formattedImages;
    } else {
      largeProductImages = formattedImages;
    }
  });

  return {
    regularProductImages: regularProductImages,
    largeProductImages: largeProductImages,
  };
};

export const randomizeImages = (
  assetItems: Entry<
  EntrySkeletonType<RawGalleryData, 'gallery'>,
  'WITHOUT_UNRESOLVABLE_LINKS',
  string
  >[],
) => {
  const separatedImages = separateLargeSmallImages(assetItems);

  const productImagesSet: GalleryData[] = [];

  let largeProductImages = separatedImages.largeProductImages.sort(
    () => Math.random() - 0.5,
  );
  let regularProductImages = separatedImages.regularProductImages.sort(
    () => Math.random() - 0.5,
  );

  while (largeProductImages.length > 0 || regularProductImages.length > 0) {
    const tempArr = [
      largeProductImages.pop()!,
      ...regularProductImages.splice(0, 6),
    ];
    tempArr.sort(() => Math.random() - 0.5);
    if (tempArr.length > 5) {
      const largeProductIndex = tempArr.findIndex((image) => image.row > 1);
      if (largeProductIndex > 3) {
        const randomIndexToReplace = Math.floor(Math.random() * 4);
        const temp = tempArr[randomIndexToReplace];
        tempArr[randomIndexToReplace] = tempArr[largeProductIndex];
        tempArr[largeProductIndex] = temp;
      }
    }
    productImagesSet.push(...tempArr);
  }

  return productImagesSet;
};
