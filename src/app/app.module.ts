import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './main/home/home.component';

import { ReCaptchaModule } from 'angular2-recaptcha';

import { MainService } from './services/main.service';
import { CancelComponent } from './main/cancel/cancel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CancelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    ReCaptchaModule
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
