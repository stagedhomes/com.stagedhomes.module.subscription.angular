export class User {
  frmFirstName: string;
  frmLastName: string;
  frmEmail: string;

  frmCreditCard: string;
  frmCardCVV: string
  frmCardExpDay: string;
  frmCardExpMonth: string;
  frmAddress: string;
  frmCity: string;
  frmState: string;
  frmZip: string;
  frmCountry: string;

  frmSubType: string;

  googleResponse: string;

  constructor() {
    this.frmFirstName = '';
    this.frmLastName = '';
    this.frmEmail = '';

    this.frmCreditCard = '';
    this.frmCardCVV = '';
    this.frmCardExpDay = '';
    this.frmCardExpMonth = '';
    this.frmAddress = '';
    this.frmCity = '';
    this.frmState = '';
    this.frmZip = '';
    this.frmCountry = '';

    this.frmSubType = '';

    this.googleResponse = ''
  }
}
