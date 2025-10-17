import { Injectable } from '@angular/core';
import { NewHomePayload } from '@app/core/models/home.model';
import { FileService } from './file.service';
import { ApiService } from './api.service';
import { ApiResponse } from '../types/api-response';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly endpoint = 'homes';

  constructor(private _file: FileService, private _api: ApiService) {}

  /** Build FormData including nested arrays + files */
  buildFormData(opts: {
    payload: NewHomePayload;
    housePhotoFiles: File[];
    bedroomPhotoFiles: File[][];
    backgroundChecks: (File | null)[];
  }): FormData {
    const { payload, housePhotoFiles, bedroomPhotoFiles, backgroundChecks } =
      opts;
    const fd = new FormData();

    // flat fields
    fd.set('phone', payload.phone);
    fd.set('address', payload.address);
    fd.set('pets', payload.pets);
    fd.set('food_service', payload.food_service);
    fd.set('special_diet', payload.special_diet);
    fd.set('age_preference', payload.age_preference);
    fd.set('gender_preference', payload.gender_preference);
    fd.set('room_count', String(payload.room_count));

    // bedrooms
    payload.bedrooms.forEach((b, i) => {
      fd.append(`bedrooms[${i}][size]`, b.size);
      fd.append(`bedrooms[${i}][bed_type]`, b.bed_type);
    });

    // residents (metadata)
    payload.residents.forEach((r, i) => {
      fd.append(`residents[${i}][full_name]`, r.full_name);
      fd.append(`residents[${i}][age]`, String(r.age));
      fd.append(`residents[${i}][occupation]`, r.occupation);
    });

    // background check files (align by index with residents)
    backgroundChecks.forEach((file, i) => {
      if (file) fd.append(`residents[${i}][background_check]`, file);
    });

    // house photos (max 3 as per your UI)
    housePhotoFiles.forEach((file, i) => {
      fd.append(`house_photos[${i}]`, file);
    });

    // bedroom photos (each room up to 3)
    bedroomPhotoFiles.forEach((files, roomIdx) => {
      files.forEach((file, j) => {
        fd.append(`bedroom_photos[${roomIdx}][${j}]`, file);
      });
    });

    // signature (if present)
    if (payload.signatureDataUrl) {
      const blob = this._file.dataUrlToBlob(payload.signatureDataUrl);
      fd.append('signature', blob, 'signature.png');
    }

    return fd;
  }

  /** POST create home listing */
  createHome(formData: FormData) {
    console.log('--- Dumping FormData ---');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, '→ File:', value.name, value.size, 'bytes');
      } else {
        console.log(key, '→', value);
      }
    }
    //la data no esta llegando aca
    // NOTE: pass endpoint WITHOUT leading slash to play nice with ApiService.buildUrl
    return this._api.post<ApiResponse<any>>(this.endpoint, formData);
  }
}
