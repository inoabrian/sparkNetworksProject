import { Component, OnInit } from '@angular/core';
import { ProfileService, Profile } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  profile: Profile;
  loadingProfile: boolean = true;
  errorLoadingProfile: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile()
    .subscribe(
      (data) => {
        this.profile = data;
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
            this.profile.profile_picture !== '' ? this.profile.profile_picture : '../../../assets/default-image.png';
  }

  handleImageUpdate(event: any): void {
    this.updateProfileImage(event.file.src);
  }

  updateProfileImage(newImageURI: string) {
    this.profile.profile_picture = newImageURI;
  }
}
