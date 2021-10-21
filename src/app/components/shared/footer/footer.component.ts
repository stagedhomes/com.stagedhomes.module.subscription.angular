import { Component, OnInit } from '@angular/core';
import { MainService } from "../../../services/main.service";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public coursesHolder = [];
  public newsHolder = [];

  constructor(public mainService: MainService) {
  }

  ngOnInit(): void {
    this.mainService.getFooterFeed()
    .then( (data: any) => {
      this.coursesHolder = data['courses'];
      //this.newsHolder = data['news'];
      //console.log(this.newsHolder);
    });
    this.mainService.getFooterBlog()
    .then( (data: any) => {
      this.newsHolder = data;
      //this.newsHolder = data['news'];
      console.log(this.newsHolder);
    });
  }

}
