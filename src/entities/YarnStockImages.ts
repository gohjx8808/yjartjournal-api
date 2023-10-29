import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import YarnStocks from './YarnStocks';

@Entity()
class YarnStockImages {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => YarnStocks, (yarnStock) => yarnStock.yarnStockImages)
  @JoinColumn({ name: 'yarn_stock_id', referencedColumnName: 'id' })
    yarnStock: YarnStocks;

  @Column({ name: 'cloudinary_id' })
    cloudinaryId: string;

  @Column({ name: 'original_name' })
    originalName: string;

  @Column({ name: 'image_url' })
    imageUrl: string;

  @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;
}

export default YarnStockImages;
