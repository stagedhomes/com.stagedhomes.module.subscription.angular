import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { MainService } from "../../services/main.service";
import { User } from "../../models/user.model";


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
  userFields: User;


  constructor(private fb: FormBuilder, public mainService: MainService) {
    this.myForm = this.fb.group({
      frmFirstName :    [''],
      frmLastName :     [''],
      frmEmail :        [''],
      frmCreditCard:    [''],
      frmCardCVV:       [''],
      frmCardExpYear :   [''],
      frmCardExpMonth : [''],
      frmAddress :      [''],
      frmCity :         [''],
      frmState :        [''],
      frmZip :          [''],
      frmCountry :      [''],
      frmSubType :      [''],
      googleResponse :  ['']
    });

    this.userFields = {
      frmFirstName : '',
      frmLastName : '',
      frmEmail : '',

      frmCreditCard : '',
      frmCardCVV : '',
      frmCardExpYear : '',
      frmCardExpMonth : '',
      frmAddress : '',
      frmCity : '',
      frmState : '',
      frmZip : '',
      frmCountry : '',

      frmSubType : '',

      googleResponse : ''
    };

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
    const formData = new FormData();

    formData.append('subType', 'asp');
    formData.append('expirationDate', this.myForm.get('frmCardExpYear')?.value + '-' + this.myForm.get('frmCardExpMonth')?.value);
    formData.append('cardNumber', this.myForm.get('frmCreditCard')?.value);
    formData.append('email', this.myForm.get('frmEmail')?.value);
    formData.append('firstName', this.myForm.get('frmFirstName')?.value);
    formData.append('lastName', this.myForm.get('frmLastName')?.value);
    formData.append('address', this.myForm.get('frmAddress')?.value);
    formData.append('city', this.myForm.get('frmCity')?.value);
    formData.append('state', this.myForm.get('frmState')?.value);
    formData.append('zip', this.myForm.get('frmZip')?.value);
    formData.append('country', this.myForm.get('frmCountry')?.value);



    this.mainService.subscribeUser(formData)
    .then((data: any) => {
      console.log('successful coms to nodejs');
      console.log(data.response);
      console.log(data.response.messages.message[0]);
    })
    .catch((err) => {
      console.log('com error to nodejs');
      console.log(err);
    });

    //this.handleSendToParent(response['success'], response['message']);
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
