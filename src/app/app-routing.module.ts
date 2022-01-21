import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { CancelComponent } from './main/cancel/cancel.component';
import { CardDetailsComponent } from './main/card-details/card-details.component';
const routes: Routes = [
  // Main Pages
  { path: '', component: HomeComponent },
  { path: 'cancel', component: CancelComponent },
  { path: 'card-details', component: CardDetailsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
