import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  getProfile(id?: string) {
    return this.http.get<Profile>(`${environment.baseURL}/profile/${ id === undefined ? 1 : id }`);
  }

  updateProfile(id: string, patchObject: Profile) {
    return this.http.patch<Profile>(`${environment.baseURL}/profile/${id}`, JSON.stringify(patchObject));
  }
}
