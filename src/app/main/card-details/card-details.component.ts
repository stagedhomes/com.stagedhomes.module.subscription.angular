import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { MainService } from "../../services/main.service";
import { User } from "../../models/user.model";


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  // note the question mark '?' makes the captcha variable optional,
  // to omit compilation warnings of us not assigning anything to it
  @ViewChild(ReCaptchaComponent) captcha?: ReCaptchaComponent;

  myForm: FormGroup;
  error = false;
  errorMessage = '';
  userFields: User;

  currentUserAspID = '';
  alertText: string;
  loading = true;


  constructor(private router: Router, private fb: FormBuilder, public mainService: MainService) {
    // the alert text is set, if some message needs to be displayed above the reg form
    this.alertText = '';
    // localStorage is of type "string | null"
    // i've never seen that before...
    const tmpAspID:string | null = localStorage.getItem('aspid');
    this.currentUserAspID = (tmpAspID !== null) ? tmpAspID.toString() : '';

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
    this.popuplateInitialFormDetails();
  }

  handleCaptchaResponse(strResponse: string): void {
    console.log('captcha response: ');
  }

  handleCaptchaExpired(): void {
    console.log('captcha expired');
  }

  popuplateInitialFormDetails(): void {
    const aspID = this.currentUserAspID;
    if (aspID != "") {
      this.mainService.getSubscription(aspID)
        .then((subData: any) => {
          console.log('current subData');
          console.log(subData.response.subscription.profile.paymentProfile.billTo);
          const billingInfo = subData.response.subscription.profile.paymentProfile.billTo;

          this.myForm = this.fb.group({
            frmFirstName :    [billingInfo.firstName],
            frmLastName :     [billingInfo.lastName],
            frmAddress :      [billingInfo.address],
            frmCity :         [billingInfo.city],
            frmState :        [billingInfo.state],
            frmZip :          [billingInfo.zip],
            frmCountry :      [billingInfo.country]
          });
          this.loading = false;

        })
        .catch((err) => {
          this.alertText = `an error occured while trying to retreive existing user sub data: ${err}`;
          console.log(this.alertText);
        })
      ; // /getSubscription
    }
  }

  handleUserSubscription(): void {
    const formData = new FormData();

    if (this.currentUserAspID != "") {
      console.log(`successfully retrieved aspID: ${this.currentUserAspID}`)
      formData.append('aspID', this.currentUserAspID);
    }
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

      if (data.response.messages.resultCode == "Ok") {
        // transaction was successful
        this.handleSendToParent(true, data.response);
      } else {
        // an error occured with the transaction
        this.handleSendToParent(false, data.response);
      }
    })
    .catch((err) => {
      // an error occured with communication to the nodejs server
      console.log('com error to nodejs');
      console.log(err);
    });

    //this.handleSendToParent(response['success'], response['message']);
  }

  handleSendToParent(success: boolean, message: string): void {
    //console.log('angular: handleSendToParent has been succesfully called');
    let description = '';
    if (success) {
      description = message;
    } else {
      description = message;
    }

    window.parent.postMessage({
      'deliverer': 'ng',
      'success': success,
      'message': description
    }, "*");
  }

}
