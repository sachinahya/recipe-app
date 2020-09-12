import { Bucket, GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import logger from '@sachinahya/logger';

import config from '../../config';
import { CloudStorageService } from '../contracts/CloudStorageService';

export default class GoogleCloudStorageService implements CloudStorageService {
  private readonly bucket: Bucket;

  constructor() {
    const storage = new Storage({ keyFilename: config.uploads.keyFileName });
    this.bucket = storage.bucket(config.uploads.bucketName);
  }

  getFileUrl(filename: string): string {
    /**
     * https://cloud.google.com/storage/docs/request-endpoints#access_to_public_objects
     */
    return `https://storage.googleapis.com/${config.uploads.bucketName}/${filename}`;
  }

  async generateUploadSignedUrl(
    mimeType: string,
    filename: string,
    expires: number
  ): Promise<string> {
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'write',
      expires,
      contentType: mimeType,
    };

    // Get a v4 signed URL for uploading file
    const [url] = await this.bucket.file(filename).getSignedUrl(options);

    logger.info(`curl -X PUT -H 'Content-Type: ${mimeType}' --upload-file my-file '${url}'`);

    return url;
  }
}
