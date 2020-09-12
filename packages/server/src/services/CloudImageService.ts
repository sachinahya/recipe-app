import { getExtension } from 'mime';
import { Inject, Service } from 'typedi';
import { v4 as uuid } from 'uuid';

import ImageMeta from '../entities/ImageMeta';
import SignedUploadRequest from '../entities/SignedUploadRequest';
import { CLOUD_STORAGE_SERVICE_TOKEN, CloudStorageService } from './contracts/CloudStorageService';

/**
 * Taken from image types listed on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#Important_MIME_types_for_Web_developers
 */
const supportedMimeTypes = [
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
];

@Service()
export default class CloudImageService {
  constructor(
    @Inject(CLOUD_STORAGE_SERVICE_TOKEN)
    private cloudStorageService: CloudStorageService
  ) {}

  resolveUrl(image: ImageMeta): ImageMeta {
    return {
      ...image,
      /**
       * Populate the URL if there isn't already a URL and we have a filename.
       */
      url:
        image.filename && !image.url
          ? this.cloudStorageService.getFileUrl(image.filename)
          : image.url,
    };
  }

  async requestUpload(mimeType: string): Promise<SignedUploadRequest> {
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes from now

    if (!supportedMimeTypes.includes(mimeType))
      throw new Error(`Unsupported image MIME type: ${mimeType}`);

    const newId = uuid();
    const filename = `${newId}.${getExtension(mimeType)}`;

    const signedUrl = await this.cloudStorageService.generateUploadSignedUrl(
      mimeType,
      filename,
      expires
    );

    const request = new SignedUploadRequest();
    request.filename = filename;
    // request.publicUrl = this.cloudStorageService.getFileUrl(filename);
    request.signedUrl = signedUrl;
    request.expires = expires;
    return request;
  }
}
