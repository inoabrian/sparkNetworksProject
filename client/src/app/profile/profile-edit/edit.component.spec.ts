import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';


import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';

import { EditComponent } from './edit.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let imageUploadComponent: ImageUploadComponent;
  let imageUploadFixture: ComponentFixture<ImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent, ImageUploadComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatIconModule, ReactiveFormsModule, MatFormFieldModule,
        MatButtonModule, MatCheckboxModule, MatDatepickerModule,
        MatInputModule, MatSelectModule, MatRadioModule,
        MatAutocompleteModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    imageUploadFixture = TestBed.createComponent(ImageUploadComponent);
    imageUploadComponent = imageUploadFixture.componentInstance;
    imageUploadFixture.detectChanges();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
