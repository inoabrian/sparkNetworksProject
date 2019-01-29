import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, Profile } from 'src/app/services/profile/profile.service';
import { DefaultsService, Cities, Figure, Religion, Ethnicity, Defaults, MaritalStatus, City } from 'src/app/services/defaults/defaults.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  profile: Profile;
  locationOptions: Cities = <Cities>{};
  defaultOptions: Defaults = <Defaults>{};
  loadingProfile: boolean = true;
  loadingDefaultOptions: boolean = true;
  errorLoadingProfile: boolean = false;
  filteredLocationOptions: Observable<City[]>;
  profileForm = new FormGroup({
    display_name : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    real_name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    birthday: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    ethnicity: new FormControl(''),
    religion: new FormControl(''),
    figure: new FormControl(''),
    marital_status: new FormControl(''),
    height: new FormControl({value: '', disabled: true}),
    occupation: new FormControl('', Validators.maxLength(256)),
    about_me: new FormControl('', Validators.maxLength(5000)),
    location: new FormControl('', Validators.required),
    profile_picture: new FormControl('')
  });

  constructor(private router: Router, private profileService: ProfileService, private defaultValueService: DefaultsService) { }

  // when component initializes we want to load cities, defaults, and profile information together
  // we receive all of the information at the same time with the fork join function
  ngOnInit() {
    forkJoin([
      this.defaultValueService.getCities(),
      this.defaultValueService.getDefaults(),
      this.profileService.getProfile()
    ])
    .subscribe((responses) => {
      this.handleCities(responses[0]);
      this.handleDefaults(responses[1]);
      this.handleProfile(responses[2]);
      this.handleLocationAutoComplete();
    },
    (err) => {
      this.errorLoadingProfile = true;
      console.error(err);
    });
  }

  getProfilePicture(): string {
    let image = this.profileForm.get('profile_picture').value;

    if(image !== null && image !== '') 
      return image;

    return '../../../assets/default-image.png';
  }

  // event handler for our image-upload component, which handles the imageUpdated event
  handleImageUpdate(event: any): void {
    this.updateProfileImage(event.file.src);
  }

  // assign profile form's the new image we received from image-upload component
  updateProfileImage(newImageURI: string) {
    this.profileForm.patchValue({profile_picture : newImageURI});
  }

  // set our profile form information with our profile data we retrieved 
  initializeForm() {
      this.profileForm.patchValue({
        display_name: this.profile.display_name,
        real_name: this.profile.real_name,
        profile_picture: this.profile.profile_picture,
        birthday: new Date(this.profile.birthday),
        gender: this.profile.gender,
        ethnicity: this.profile.ethnicity,
        religion: this.profile.religion,
        figure: this.profile.figure,
        marital_status: this.profile.marital_status,
        height: this.profile.height,
        occupation: this.profile.occupation,
        about_me: this.profile.about_me,
        location: this.profile.location
      });
  }

  // reset form with default information
  resetForm() {
    this.initializeForm();
  }

  updateProfileInformation() {
    if(this.profileForm.valid) {
      this.profileService.updateProfile(this.profile.userId, this.profileForm.value)
        .subscribe(
          (data)=> {
            console.log(data);
          },
          this.handleError
        );
    }
  }

  // assigns profile data to our profile property and triggers our form initialization
  handleProfile(data) {
    this.profile = data;
    this.loadingProfile = false;
    this.initializeForm();
  }

  // set up our filtering pipe line for our profile form location control's valueChange observable
  handleLocationAutoComplete() {
    this.filteredLocationOptions = this.profileForm.controls['location'].valueChanges.pipe(
      startWith(this.profile.location),
      map(value => typeof value === 'string' ? value : value.city),
      map(value => this._filter(value))
    );
  }

  // assigns location options to our locationOptions property
  handleCities(data) {
    this.locationOptions = data;
    this.loadingDefaultOptions = false;
  }

  // assigns default values to our defaultOptions property
  handleDefaults(data) {
    this.defaultOptions = data;
    this.loadingDefaultOptions = false;
  } 
  
  // generic error handler, which can later be improved to support a logging service
  handleError(err) {
    console.error(err);
  }

  // mapValueToCity => helps us retrieve the city by matching location lat long values
  mapValueToCity = (valueToMap)  => {
    if(valueToMap !== undefined) {
      let selection = this.locationOptions.cities.find((_city) => _city.lat === valueToMap.lat && _city.lon === valueToMap.lon);

      if(selection)
        return selection.city;
    }
  }

  navigateToProfile() {
      this.router.navigate(['/profile']);
  }

  // _filter => allows us to return the list of cities that match the text provided by the user
  private _filter(value: any): City[] {
    let filterValue; 
    let filteredSelections;

    // Need to check undefined for when the input is empty initially
    if(typeof value === 'undefined')
      return;

    // We need to distinguish which type is being passed for value
    // 1) When the value is mapped by our mapValueToCity it's a string value
    // 2) When the value is passed by clicking the selection option we get an object with [lat,lon] keys because we want to save those values
    if(typeof value === 'string') {  
      filterValue = value.toLowerCase();

      filteredSelections = this.locationOptions.cities.filter((option: City) => option.city.toLowerCase().indexOf(filterValue) === 0);
    }
    else {
      filterValue = value;
      
      filteredSelections = this.locationOptions.cities.filter((option: City) => option.lat == filterValue.lat && option.lon == filterValue.lon);
    }

    // filteredSelections => an array of remaining options to select from
    return filteredSelections;
  }
}
