import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Gender {
  id: string;
  name: string;
}

export interface Ethnicity {
  id: string;
  name: string;
}

export interface Religion {
  id: string;
  name: string;
}

export interface Figure {
  id: string;
  name: string;
}

export interface MaritalStatus {
  id: string;
  name: string;
}

export interface Defaults {
  gender: Gender[];
  ethnicity: Ethnicity[];
  religion: Religion[];
  figure: Figure[];
  marital_status: MaritalStatus[];
}

export interface City {
  lat: string;
  lon: string;
  city: string;
};

export interface Cities {
  cities: Array<City>;
};

@Injectable({
  providedIn: 'root'
})
export class DefaultsService {
  cachedCities: Cities;
  cacheTime: Date;
  cachedDefaults: Defaults;

  constructor(private http: HttpClient) { 
    this.cacheTime = new Date();
  }

  /*
    Service to serve our default cities and fixed values data

    Note:
    I decided to implement a cache feature for our default data since it does not change
  */
  getCities() {
    let currentTime = new Date();
    if(this.cachedCities !== undefined && !this.cacheExpired())
      return from([this.cachedCities]);
      
    return this.http.get<Cities>(`${environment.baseURL}/en/locations`);
  }

  getDefaults() {
    if(this.cachedDefaults !== undefined && !this.cacheExpired())
      return from([this.cachedDefaults]);

    return this.http.get<Defaults>(`${environment.baseURL}/en/attributes`);
  }

  private cacheExpired(): boolean {
    let currentTime = new Date();

    let expired = (+currentTime - +this.cacheTime) < 5000;
    
    if(expired)
      this.resetCacheTime();

    return expired;
  }

  private resetCacheTime() {
    this.cacheTime = new Date();
  }
}
