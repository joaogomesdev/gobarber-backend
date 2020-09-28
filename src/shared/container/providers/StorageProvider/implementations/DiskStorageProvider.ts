import fs from 'fs';
import path from 'path';
import IStorageProvider from "../models/IStorageProvider";
import uploadConfig from '@config/upload';
class DiskStrorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder , file),
      path.resolve(uploadConfig.uploadsFolders, file),
      );

      return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolders, file);
    try {
      await fs.promises.stat(filePath)
    } catch {
      return;
    }
    await fs.promises.unlink(filePath)
  }
}

export default DiskStrorageProvider;