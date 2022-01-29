import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isTesting = true;
  public footerFeedURL: string;
  public footerBlogURL: string;
  public serverApiURL: string;

  constructor(private http: HttpClient) {
    if (this.isTesting === true) {
      // use localhost URL
      this.footerFeedURL = "http://localhost:8860/assets/app_standalones/footerFeeds/";
      this.footerBlogURL = "https://pages.stagedhomes.com/wp-json/wp/v2/posts?per_page=5&orderby=date";
      this.serverApiURL = "http://localhost:9016/memberships/";

    } else {
      // use Live URL
      this.footerFeedURL = "https://stagedhomes.com/assets/app_standalones/footerFeeds/";
      this.footerBlogURL = "https://pages.stagedhomes.com/wp-json/wp/v2/posts?per_page=5&orderby=date";
      this.serverApiURL = "http://localhost:9016/memberships/";
    }

  } // /constructor

  public async subscribeUser(formData: any) {
    //const strBody = JSON.stringify(formData.entries());
    const constHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const subURL = this.serverApiURL + 'create_subscription';
    // formData is a formdata object, so we can send that directly to the nodejs
    //console.log(...formData);

    //iterate thru the formData to form a propper object that we can JSONify
    let tmpObject: { [key:number]: string } = {}; 
    formData.forEach((value: string, key: number) => {
      tmpObject[key] = value;
    });
    const strBody = JSON.stringify(tmpObject);
    console.log('strBody:');
    console.log(strBody);

    return await this.http.post(subURL, strBody, { headers: constHeaders }).toPromise();
  }

  public async updateSub(formData: any) {
    const constHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const subURL = this.serverApiURL + 'update_subscription';
    // formData is a formdata object, so we can send that directly to the nodejs
    //console.log(...formData);

    //iterate thru the formData to form a propper object that we can JSONify
    let tmpObject: { [key:number]: string } = {}; 
    formData.forEach((value: string, key: number) => {
      tmpObject[key] = value;
    });
    const strBody = JSON.stringify(tmpObject);
    console.log('strBody:');
    console.log(strBody);

    return await this.http.post(subURL, strBody, { headers: constHeaders }).toPromise();
  }

  public async getSubscriptionStatus(aspID: string) {
    console.log(`the sub ID to be checked: ${aspID}`);
    const constHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const subURL = this.serverApiURL + 'check_status_subscription/aspid';

    const tmpObject = {
    "aspId" : aspID
    }
    const strBody = JSON.stringify(tmpObject);
    return await this.http.post(subURL, strBody, { headers: constHeaders }).toPromise();
  }

  public async getSubscription(aspID: string) {
    console.log(`the sub ID to be pulled: ${aspID}`);
    const constHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const subURL = this.serverApiURL + 'get_subscription/aspid';

    const tmpObject = {
    "aspId" : aspID
    }
    const strBody = JSON.stringify(tmpObject);
    return await this.http.post(subURL, strBody, { headers: constHeaders }).toPromise();
  }


  public async getFooterFeed() {
    return await this.http.get<any>(this.footerFeedURL).toPromise();
  }
  public async getFooterBlog() {
    return await this.http.get<any>(this.footerBlogURL).toPromise();
  }

  public formatDecodeHTML(theString: string) {
    return new DOMParser().parseFromString(theString, "text/html").documentElement.textContent;
  }
  public formatDate(theDate: string) {
    // Note:
    // I opted to do the date formatting manually, because when
    // doing it via the Date obj, it was getting converted to UTC,
    // and showing the day as a day early (it was adding an arbitrary time)
    const parts = theDate.split("-");
    let strMo = "";
    switch(parts[1]) {
      case "01":
        strMo = "Jan"
        break;
      case "02":
        strMo = "Feb"
        break;
      case "03":
        strMo = "Mar"
        break;
      case "04":
        strMo = "Apr"
        break;
      case "05":
        strMo = "May"
        break;
      case "06":
        strMo = "Jun"
        break;
      case "07":
        strMo = "Jul"
        break;
      case "08":
        strMo = "Aug"
        break;
      case "09":
        strMo = "Sep"
        break;
      case "10":
        strMo = "Oct"
        break;
      case "11":
        strMo = "Nov"
        break;
      case "12":
        strMo = "Dec"
        break;
      default:
        strMo = parts[1];
    }


    return `${strMo} ${parts[2]}`;
  }
}
