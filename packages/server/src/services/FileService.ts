import { ReadStream } from 'fs';
import fs from 'fs-extra';
import { Service } from 'typedi';

@Service()
export default class FileService {
  async save(stream: ReadStream, filePath: string): Promise<string> {
    if (!filePath) {
      throw new Error('File name is required.');
    }

    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
      stream
        .pipe(writer)
        .on('close', () => {
          resolve(filePath);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }
}
