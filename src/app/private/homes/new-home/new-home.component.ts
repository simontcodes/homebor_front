import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-new-home',
  standalone: true,
  templateUrl: './new-home.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
  ],
})
export class NewHomeComponent implements OnInit {
  @Input() color: 'light' | 'dark' = 'light';
  @ViewChild('stepper') stepper!: MatStepper;

  stepIndex = 0;

  steps = ['House Info', 'Preferences', 'Room Details', 'Household Members'];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;

  housePhotos: string[] = [];
  bedroomPhotos: string[][] = [];

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      phone: ['', Validators.required],
      address: ['', Validators.required],
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

  createResidentGroup(): FormGroup {
    return this.fb.group({
      full_name: ['', Validators.required],
      age: ['', Validators.required],
      occupation: ['', Validators.required],
      background_check: [null],
    });
  }

  onStepChange(event: any) {
    this.stepIndex = event.selectedIndex;
  }

  onRoomCountChange(): void {
    const roomCount = this.thirdFormGroup.get('room_count')?.value || 0;
    this.bedrooms.clear();
    this.bedroomPhotos = [];

    for (let i = 0; i < roomCount; i++) {
      this.bedrooms.push(
        this.fb.group({
          size: ['', Validators.required],
          bed_type: ['', Validators.required],
        })
      );
      this.bedroomPhotos[i] = []; // Ensures each index is an array
    }

    this.currentBedroomIndex = 0;
  }

  nextBedroom() {
    if (this.bedrooms.at(this.currentBedroomIndex).valid) {
      this.currentBedroomIndex++;
    }
  }

  onBedroomPhotosSelected(event: any, index: number): void {
    const files = Array.from(event.target.files) as File[];
    const photos = files.slice(0, 3).map((file) => URL.createObjectURL(file));
    this.bedroomPhotos[index] = [
      ...(this.bedroomPhotos[index] || []),
      ...photos,
    ].slice(0, 3);
  }

  onHousePhotosSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files)
        .slice(0, 3 - this.housePhotos.length)
        .forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.housePhotos.push(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
    }
  }

  addResident() {
    this.residents.push(this.createResidentGroup());
  }

  removeResident(index: number) {
    this.residents.removeAt(index);
  }

  onBackgroundFileChange(event: Event, index: number) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.residents.at(index).patchValue({ background_check: file });
    }
  }

  onSubmit() {
    const data = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    console.log('Submitted form:', data);
    // TODO: send to backend
  }
}
