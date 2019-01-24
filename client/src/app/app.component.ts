import { Component, OnInit } from '@angular/core';
import { DefaultsService } from './services/defaults/defaults.service';
import { ProfileService } from './services/profile/profile.service';
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
    this.defaultService.getDefaults().subscribe(
      (data) => {
        console.log(data);
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
        console.log(data);
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
