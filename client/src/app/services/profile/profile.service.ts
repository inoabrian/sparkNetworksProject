import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Location {
    lat: string;
    lon: string;
};

export interface Profile {
    userId: string;
    display_name: string;
    real_name: string;
    profile_picture?: any;
    birthday: string;
    gender: string;
    ethnicity: string;
    religion: string;
    figure: string;
    marital_status: string;
    height: string;
    occupation: string;
    about_me: string;
    location: Location;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: Profile;

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<Profile>('http://localhost:8000/profile/1');
  }

  updateProfile() {
    return this.http.patch<Profile>('http://localhost:8000/profile/1', JSON.stringify({"display_name": "Default"}));
  }
}
