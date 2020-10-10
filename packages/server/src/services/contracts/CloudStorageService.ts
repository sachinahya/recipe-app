import { Token } from 'typedi';

export interface CloudStorageService {
  getFileUrl(filename: string): string;
  generateUploadSignedUrl(mimeType: string, filename: string, expires: number): Promise<string>;
}

export const CLOUD_STORAGE_SERVICE_TOKEN = new Token<CloudStorageService>('CloudStorageService');
