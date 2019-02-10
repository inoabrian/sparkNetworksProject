import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from 'src/app/services/profile/profile.service';
import { Cities, DefaultsService, City, Defaults } from 'src/app/services/defaults/defaults.service';
import { PersonalInformation } from 'src/app/profile/shared/profile.model';
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  profile: Profile;
  locationOptions: Cities = <Cities>{};
  defaultOptions: Defaults = <Defaults>{};
  loadingProfile: boolean = true;
  errorLoadingProfile: boolean = false;
  usersLocation: City;

  constructor(private profileService: ProfileService, private defaultValueService: DefaultsService) { }

  // After the component is created we want to load our data immediately
  ngOnInit() {
    // using the rxjs forkJoin function  to help us cleanly wait for all responses
    // we do this here because there is no use for one without the other here.
    forkJoin([
      this.defaultValueService.getCities(),
      this.defaultValueService.getDefaults(),
      this.profileService.getProfile("1")
    ])
    .subscribe((responses) => {      
      this.handleCities(responses[0]);
      this.handleDefaults(responses[1]);
      this.handleProfile(responses[2]);
    }, 
    (err) => {
      this.errorLoadingProfile = true;
      console.error(err);
    }); 
  }

/**
 * BEGIN MAPPING METHOD SECTION
 */

  // method to help us display the default avatar or a profile_picture that was previously saved
  getProfilePicture(): string {
    return  this.profile.profile_picture !== null && 
            this.profile.profile_picture !== '' ? this.profile.profile_picture : '../../assets/default-image.png';
  }

  // method to map a name to the lat,lon from the user's profile data
  getLocation() {
    return this.locationOptions.cities
      .filter((_location) => _location.lat == this.profile.location.lat &&  _location.lon == this.profile.location.lon)[0].city;
  }

  // method to map a gender text to the gender id from the user's profile data
  getGender() {
    return this.defaultOptions.gender.filter((_gender) => _gender.id === this.profile.gender)[0].name;
  }

  // method to map a ethnicity text to the ethnicity id from the user's profile data
  getEthnicity() {
    return this.defaultOptions.ethnicity.filter((_ethnicity) => _ethnicity.id === this.profile.ethnicity)[0].name;
  }

  // method to map a religion text to the religion id from the user's profile data
  getReligion() {
    return this.defaultOptions.religion.filter((_religion) => _religion.id === this.profile.religion)[0].name;
  }

  // method to map a figure text to the figure id from the user's profile data
  getFigure() {
    return this.defaultOptions.figure.filter((_figure) => _figure.id === this.profile.figure)[0].name;
  }

  /**
   * END MAPPING METHOD SECTION
   */

  // helper method to feed personal information list to presentational child component
  getPersonalInformationList(): PersonalInformation {
    return <PersonalInformation> {
      personalInformation: [
        {label: 'Ethnicity', value: this.getEthnicity()},
        {label: 'Religion',  value: this.getReligion()},
        {label: 'Birthday', value: new Date(this.profile.birthday).toLocaleDateString()},
        {label: 'Height', value: this.profile.height},
        {label: 'Figure', value: this.getFigure()},
        {label: 'Gender', value: this.getGender()}
      ],
      aboutInformation: this.profile.about_me
    }
  }

  // handle the profile data after our ngInit requests finish
  handleProfile(data: Profile) {
    this.profile = data;
    this.loadingProfile = false;
  }

  // handle the cities data after our ngInit requests finish
  handleCities(data: Cities) {
    this.locationOptions = data;
  }

  // handle the defaults data after our ngInit requests finish
  handleDefaults(data: Defaults) {
    this.defaultOptions = data;
  } 
}
