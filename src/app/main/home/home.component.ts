import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { MainService } from "../../services/main.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // note the question mark '?' makes the captcha variable optional,
  // to omit compilation warnings of us not assigning anything to it
  @ViewChild(ReCaptchaComponent) captcha?: ReCaptchaComponent;

  myForm: FormGroup;
  error = false;
  errorMessage = '';


  constructor(private fb: FormBuilder, public mainService: MainService) {
    this.myForm = this.fb.group({
      frmCreditCard: ['', Validators.required],
      frmCardCVV: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }

  handleCaptchaResponse(strResponse: string): void {
    console.log('captcha response: ');
  }

  handleCaptchaExpired(): void {
    console.log('captcha expired');
  }

  handleUserSubscription(): void {
    const response = this.mainService.subscribeUser();
    this.handleSendToParent(response['success'], response['message']);
  }

  handleSendToParent(success: boolean, message: string): void {
    //console.log('angular: handleSendToParent has been succesfully called');
    let description = '';
    if (success) {
      description = 'Subscription successful message';
    } else {
      description = 'Subscription failed message';
    }

    window.parent.postMessage({
      'deliverer': 'ng',
      'success': success,
      'message': description
    }, "*");
  }

}
