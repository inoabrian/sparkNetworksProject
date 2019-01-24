import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

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
  cachedDefaults: Defaults;
  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    if(this.cachedCities !== undefined)
      return from([this.cachedCities]);
      
    this.http.get<Cities>('http://localhost:8000/en/locations').subscribe((data) => {this.cachedCities = data});

    return from([this.cachedCities]);
  }

  getDefaults(): Observable<any> {
    if(this.cachedDefaults !== undefined)
      return from([this.cachedDefaults]);

    this.http.get<Defaults>('http://localhost:8000/en/attributes');
    
    return from([this.cachedDefaults]);
  }
}
