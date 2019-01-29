import { Component, OnInit } from '@angular/core';
import { DefaultsService } from 'src/app/services/defaults/defaults.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import * as RxJS  from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private defaultService: DefaultsService, private profileService: ProfileService) {

  }

  ngOnInit(): void {
   this.loadDefaultApplicationValues();
  }

  loadDefaultApplicationValues() {
    this.defaultService.getDefaults().subscribe(
      (data) => {
        this.defaultService.cachedDefaults = data;
      },
      (err) => {
        console.warn(err);
      },
      () => {
        console.log('request completed');
      }
    );

    this.defaultService.getCities().subscribe(
      (data) => {
        this.defaultService.cachedCities = data;
      },
      (err) => {
        console.warn(err);
      },
      () => {
        console.log('request completed');
      }
    );
  }
}
