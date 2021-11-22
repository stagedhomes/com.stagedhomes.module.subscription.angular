import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReCaptchaComponent } from 'angular2-recaptcha';


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


  constructor(private fb: FormBuilder) {
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

  handleSendToParent(message: string): void {
    console.log('angular: handleSendToParent has been succesfully called');
    window.parent.postMessage({
      'deliverer': 'ng',
      'func': 'callFromIframe',
      'message': message
    }, "*");
  }

}
