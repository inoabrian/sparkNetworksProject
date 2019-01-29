import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatAutocompleteModule } from '@angular/material';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewComponent } from 'src/app/profile/profile-view/view.component';
import { EditComponent } from 'src/app/profile/profile-edit/edit.component';
import { PersonInformationListComponent } from 'src/app/profile/profile-view/person-information-list/person-information-list.component';
import { ImageUploadComponent } from 'src/app/profile/profile-edit/image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  declarations: [ViewComponent, EditComponent, PersonInformationListComponent, ImageUploadComponent]
})
export class ProfileModule { }
