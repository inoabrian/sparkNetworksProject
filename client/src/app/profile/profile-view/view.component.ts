import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from 'src/app/services/profile/profile.service';
import { Cities, DefaultsService, City, Defaults } from 'src/app/services/defaults/defaults.service';
import { PersonalInformation } from 'src/app/profile/shared/profile.model';
import { Observable } from 'rxjs';
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

  ngOnInit() {
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

  getProfilePicture(): string {
    return  this.profile.profile_picture !== null && 
            this.profile.profile_picture !== '' ? this.profile.profile_picture : '../../assets/default-image.png';
  }

  getLocation() {
    return this.locationOptions.cities
      .filter((_location) => _location.lat == this.profile.location.lat &&  _location.lon == this.profile.location.lon)[0].city;
  }

  getGender() {
    return this.defaultOptions.gender.filter((_gender) => _gender.id === this.profile.gender)[0].name;
  }

  getEthnicity() {
    return this.defaultOptions.ethnicity.filter((_ethnicity) => _ethnicity.id === this.profile.ethnicity)[0].name;
  }

  getReligion() {
    return this.defaultOptions.religion.filter((_religion) => _religion.id === this.profile.religion)[0].name;
  }

  getFigure() {
    return this.defaultOptions.figure.filter((_figure) => _figure.id === this.profile.figure)[0].name;
  }

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

  handleProfile(data) {
    this.profile = data;
    this.loadingProfile = false;
  }

  handleCities(data) {
    this.locationOptions = data;
  }

  handleDefaults(data) {
    this.defaultOptions = data;
  } 
}
