import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from 'src/app/services/profile/profile.service';
import { Cities, DefaultsService, City } from 'src/app/services/defaults/defaults.service';
import { PersonalInformation } from 'src/app/profile/shared/profile.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  profile: Profile;
  loadingProfile: boolean = true;
  errorLoadingProfile: boolean = false;

  constructor(private profileService: ProfileService, private defaultsService: DefaultsService) { }

  ngOnInit() {
    // set a timeout to show an error after 5 seconds
    let checkRequestTimeout = setTimeout(() => {
      if(this.profile === undefined) {
        this.loadingProfile = false;
        this.errorLoadingProfile = true;
      }
    }, 5000);

    this.profileService.getProfile()
    .subscribe(
      (data) => {
        this.profile = data;
        clearTimeout(checkRequestTimeout);
      },
      (err) => {
        this.loadingProfile = false;
        this.errorLoadingProfile = true;
      },
      () => {
        this.loadingProfile = false;
      }
    );
  }

  getProfilePicture(): string {
    return  this.profile.profile_picture !== null && 
            this.profile.profile_picture !== '' ? this.profile.profile_picture : '../../assets/default-image.png';
  }

  getLocationText(): string {
    let usersLocation: City;
    this.defaultsService.getCities()
      .subscribe((data: Cities) => {
        usersLocation = data.cities.filter((element) => element.lat == this.profile.location.lat && element.lon == this.profile.location.lon)[0];
      });

      return usersLocation.city;
  }

  getPersonalInformationList(): PersonalInformation {
    return <PersonalInformation> {
      personalInformation: [
        {label: 'Ethnicity', value: this.profile.ethnicity},
        {label: 'Religion',  value: this.profile.religion},
        {label: 'Birthday', value: this.profile.birthday},
        {label: 'Height', value: this.profile.height},
        {label: 'Figure', value: this.profile.figure},
      ],
      aboutInformation: this.profile.about_me
    }
  }
}
