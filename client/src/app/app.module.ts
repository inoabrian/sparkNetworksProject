import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DefaultsService } from './services/defaults/defaults.service';
import { ProfileService } from './services/profile/profile.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DefaultsService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
