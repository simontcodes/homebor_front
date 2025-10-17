import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileService {
  dataUrlToBlob(dataUrl: string, fallbackMime = 'image/png'): Blob {
    const [meta, b64] = dataUrl.split(',');
    const match = /data:(.*?);base64/.exec(meta);
    const mime = match?.[1] || fallbackMime;
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }
}