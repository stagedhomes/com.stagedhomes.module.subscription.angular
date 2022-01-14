import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { CancelComponent } from './main/cancel/cancel.component';

const routes: Routes = [
  // Main Pages
  { path: '', component: HomeComponent },
  { path: 'cancel', component: CancelComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
