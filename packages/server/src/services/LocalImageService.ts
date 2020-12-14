import { ReadStream } from 'fs-extra';
import path from 'path';
import { Service } from 'typedi';
import { FindConditions, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { v4 as uuid } from 'uuid';

import config from '../config';
import ImageMeta from '../entities/ImageMeta';
import StagedImage from '../resolvers/inputTypes/StagedImage';
import FileService from './FileService';

const getExtension = (mimetype: string): string | undefined => {
  if (mimetype === 'image/jpeg') return '.jpg';
};

export interface FileDescriptor {
  stream?: ReadStream;
  mimetype?: string;
  filePath?: string;
  url?: string;
}

export interface FileLocator {
  filename?: string;
  url?: string;
}

@Service()
export default class ImageService {
  private rootPath: string = config.uploads.dir;
  private rootUrl: string = config.uploads.url;

  constructor(
    @InjectRepository(ImageMeta) private repository: Repository<ImageMeta>,
    private storageService: FileService
  ) {}

  resolveUrls(images: ImageMeta[]): ImageMeta[] {
    return images.map(img => ({
      ...img,
      url: img.filename ? this.rootUrl + img.filename : img.url,
    }));
  }

  async getImagesByRecipeId(stagedImages: StagedImage[], recipeId: number): Promise<ImageMeta[]> {
    return this.repository.findByIds(
      stagedImages.map(img => img.id),
      {
        where: { recipe: { id: recipeId } },
      }
    );
  }

  async getStagedImages(stagedImages: StagedImage[], recipeId?: number): Promise<ImageMeta[]> {
    /**
     * This may also want to move the staged images to another location,
     * e.g. AWS storage etc. and update the database before returning the
     * entities to the Recipe.
     */

    const conditions: FindConditions<ImageMeta>[] = [{ recipe: undefined }];

    if (recipeId) {
      conditions.push({ recipe: { id: recipeId } });
    }

    return this.repository.findByIds(
      stagedImages.map(img => img.id),
      {
        where: conditions,
      }
    );
  }

  async stageImage({ stream, mimetype, url }: FileDescriptor): Promise<string> {
    if (stream && url) {
      throw new Error('Cannot pass in both a stream and a URL.');
    }

    const id = uuid();
    let filename: string | undefined = undefined;

    if (stream) {
      if (!mimetype) {
        throw new Error('Cannot pass a stream without specifying a mimetype.');
      }

      const extension = getExtension(mimetype) || '';
      filename = id + extension;
      /* const imagePath =  */ await this.storageService.save(
        stream,
        path.join(this.rootPath, filename)
      );
    }

    const imageEntity = await this.repository.save({
      id,
      filename,
      mimetype,
      url,
    });

    return imageEntity.id;
  }
}
