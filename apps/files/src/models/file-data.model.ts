/* eslint-disable @typescript-eslint/camelcase */
import { FileMetadata } from './file-metadata.model';

export class FileData {
  id: string;
  uploadLength: number;
  uploadMetadata: FileMetadata;

  constructor(
    id: string,
    upload_length: number,
    upload_metadata: FileMetadata,
  ) {
    this.id = id;
    this.uploadLength = upload_length;
    this.uploadMetadata = upload_metadata;
  }
}
