import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { SignaturePadModule } from 'ngx-signaturepad';
import { MatStepper } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';

import { HomeService } from '@app/core/services/home.service';
import { SignatureCanvasComponent } from 'src/app/components/signature-canvas/signature-canvas.component';

@Component({
  selector: 'app-new-client',
  standalone: true,
  templateUrl: './new-client.component.html',
  imports: [ CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatSelectModule,
      MatOptionModule,
      MatStepperModule,
      MatCardModule,],
})
export class NewClientComponent implements OnInit {
  @Input() color: 'light' | 'dark' = 'light';
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('signatureCanvas', { static: true })
  signatureCanvas!: ElementRef<HTMLCanvasElement>;

  stepIndex = 0;



  signatureDataUrl = ''; // Final base64 image

  steps = ['House Info', 'Preferences', 'Room Details', 'Household Members'];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;

  // Preview images (data URLs / object URLs) that you already display
  housePhotos: string[] = [];
  bedroomPhotos: string[][] = [];

  // ⬇️ Real files to upload
  housePhotoFiles: File[] = [];
  bedroomPhotoFiles: File[][] = []; // index per bedroom
  backgroundChecksFiles: (File | null)[] = []; // index per resident

  currentBedroomIndex = 0;

  get bedrooms(): FormArray {
    return this.thirdFormGroup.get('bedrooms') as FormArray;
  }

  getBedroomFormGroup(index: number): FormGroup {
    return this.bedrooms.at(index) as FormGroup;
  }

  getCurrentBedroomPhotos(): string[] {
    return this.bedroomPhotos[this.currentBedroomIndex] || [];
  }

  get residents(): FormArray {
    return this.fourthFormGroup.get('residents') as FormArray;
  }

  constructor(private fb: FormBuilder, private homeService: HomeService) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      pets: ['', Validators.required],
      food_service: ['', Validators.required],
      special_diet: ['', Validators.required],
      age_preference: ['', Validators.required],
      gender_preference: ['', Validators.required],
    });

    this.thirdFormGroup = this.fb.group({
      room_count: ['', Validators.required],
      bedrooms: this.fb.array([]),
    });

    // Watch for changes to number_of_rooms
    this.thirdFormGroup.get('room_count')?.valueChanges.subscribe(() => {
      this.onRoomCountChange();
    });

    this.fourthFormGroup = this.fb.group({
      residents: this.fb.array([this.createResidentGroup()]),
    });

  }

   // Forms
  createResidentGroup(): FormGroup {
    return this.fb.group({
      full_name: ['', Validators.required],
      age: ['', Validators.required],
      occupation: ['', Validators.required],
      background_check: [null], // kept for UI binding if needed
    });
  }

  onStepChange(event: any) {
    this.stepIndex = event.selectedIndex;
  }

  onRoomCountChange(): void {
    const roomCount = this.thirdFormGroup.get('room_count')?.value || 0;
    this.bedrooms.clear();
    this.bedroomPhotos = [];
    this.bedroomPhotoFiles = [];

    for (let i = 0; i < roomCount; i++) {
      this.bedrooms.push(
        this.fb.group({
          size: ['', Validators.required],
          bed_type: ['', Validators.required],
        })
      );
      this.bedroomPhotos[i] = [];
      this.bedroomPhotoFiles[i] = [];
    }

    this.currentBedroomIndex = 0;
  }

  nextBedroom() {
    if (this.bedrooms.at(this.currentBedroomIndex).valid) {
      this.currentBedroomIndex++;
    }
  }

  // File inputs
  onBedroomPhotosSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    if (!this.bedroomPhotoFiles[index]) this.bedroomPhotoFiles[index] = [];
    const remaining = Math.max(0, 3 - this.bedroomPhotoFiles[index].length);
    const toAdd = Array.from(input.files).slice(0, remaining);

    // Save real files for upload
    this.bedroomPhotoFiles[index].push(...toAdd);

    // Keep/refresh previews
    const photos = toAdd.map((file) => URL.createObjectURL(file));
    this.bedroomPhotos[index] = [
      ...(this.bedroomPhotos[index] || []),
      ...photos,
    ].slice(0, 3);

    input.value = ''; // allow selecting the same files again
  }

  onHousePhotosSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const remaining = Math.max(0, 3 - this.housePhotoFiles.length);
    const toAdd = Array.from(input.files).slice(0, remaining);

    // Save real files for upload
    this.housePhotoFiles.push(...toAdd);

    // Keep previews
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => this.housePhotos.push(reader.result as string);
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  addResident() {
    this.residents.push(this.createResidentGroup());
    this.backgroundChecksFiles.push(null);
  }

  removeResident(index: number) {
    this.residents.removeAt(index);
    this.backgroundChecksFiles.splice(index, 1);
  }

  onBackgroundFileChange(event: Event, index: number) {
    const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
    this.backgroundChecksFiles[index] = file;
    this.residents.at(index).patchValue({ background_check: file });
  }

  // Add this helper method inside your component class
  private debugFormData(fd: FormData): void {
    // Print each key/value; show file metadata nicely
    for (const [key, val] of fd.entries()) {
      if (val instanceof File) {
        console.log(key, {
          name: val.name,
          size: val.size,
          type: val.type,
          lastModified: val.lastModified,
        });
      } else {
        console.log(key, val);
      }
    }
  }

  // Submit
  onSubmit() {
    console.log('[onSubmit] clicked');

    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid ||
      this.fourthFormGroup.invalid
    ) {
      console.warn('[onSubmit] invalid form', {
        first: this.firstFormGroup.status,
        second: this.secondFormGroup.status,
        third: this.thirdFormGroup.status,
        fourth: this.fourthFormGroup.status,
      });
      this.firstFormGroup.markAllAsTouched();
      this.secondFormGroup.markAllAsTouched();
      this.thirdFormGroup.markAllAsTouched();
      this.fourthFormGroup.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value, // room_count + bedrooms[]
      residents: this.residents.value,
      signatureDataUrl: this.signatureDataUrl || undefined,
    };

    const formData = this.homeService.buildFormData({
      payload,
      housePhotoFiles: this.housePhotoFiles,
      bedroomPhotoFiles: this.bedroomPhotoFiles,
      backgroundChecks: this.backgroundChecksFiles,
    });

    console.log('[onSubmit] built FormData:');
    this.debugFormData(formData); // <-- this actually prints the contents

    this.homeService.createHome(formData).subscribe({
      next: (res) => {
        console.log('Home created!', res);
        // TODO: toast / navigate
      },
      error: (err) => {
        console.error('Create home failed', err);
        // TODO: show error toast
      },
    });
  }
}
