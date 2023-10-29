import { UploadApiResponse } from 'cloudinary';
import { manager } from '../dataSource';
import YarnStockImages from '../entities/YarnStockImages';

const yarnStockImageManager = manager.getRepository(YarnStockImages);

class YarnStockImageRepository {
  insertNewImage = async (
    uploadedImage: UploadApiResponse,
    imageName: string,
    yarnStockId: number,
  ) =>
    yarnStockImageManager.insert({
      cloudinaryId: uploadedImage.public_id,
      imageUrl: uploadedImage.secure_url,
      originalName: imageName,
      yarnStock: { id: yarnStockId },
    });

  delete = async (yarnImageId: number) =>
    yarnStockImageManager.delete({ id: yarnImageId });

  getByYarnStockId = async (yarnStockId: number) =>
    yarnStockImageManager.findBy({ yarnStock: { id: yarnStockId } });

  update = async (
    uploadedImage: UploadApiResponse,
    imageName: string,
    yarnImageId: number,
    yarnStockId: number,
  ) =>
    yarnStockImageManager.update(
      { id: yarnImageId },
      {
        cloudinaryId: uploadedImage.public_id,
        imageUrl: uploadedImage.secure_url,
        originalName: imageName,
        yarnStock: { id: yarnStockId },
      },
    );
}

export default YarnStockImageRepository;
