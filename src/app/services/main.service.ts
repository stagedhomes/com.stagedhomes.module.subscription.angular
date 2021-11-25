import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isTesting = true;
  public footerFeedURL: string;
  public footerBlogURL: string;

  constructor(private http: HttpClient) {
    if (this.isTesting === true) {
      // use localhost URL
      this.footerFeedURL = "http://localhost:8860/assets/app_standalones/footerFeeds/";
      this.footerBlogURL = "https://pages.stagedhomes.com/wp-json/wp/v2/posts?per_page=5&orderby=date";
    } else {
      // use Live URL
      this.footerFeedURL = "https://stagedhomes.com/assets/app_standalones/footerFeeds/";
      this.footerBlogURL = "https://pages.stagedhomes.com/wp-json/wp/v2/posts?per_page=5&orderby=date";
    }

  } // /constructor

  public subscribeUser() {
    return {
      success: false,
      message: 'this represents a failure message returned from nodejs'
    };
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
