import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
  {path: '', redirectTo: '/profile', pathMatch: 'full'},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { 
      enableTracing: true,
      useHash: true 
    } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
