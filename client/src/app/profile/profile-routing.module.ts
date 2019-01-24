import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './profile-view/view.component';
import { EditComponent } from './profile-edit/edit.component';

const routes: Routes = [
  {path: '', component: ViewComponent},
  {path: 'edit', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
