import { Component, OnInit, Input } from '@angular/core';

import { Email } from '../../model/Email';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';

import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {
  email: Email;
  buttonClicked: boolean;
  submitted: boolean;

  constructor(private http: Http,
              private appService: ApplicationService) {
  }

  ngOnInit(): void {
    this.appService.wakeServer();
    this.email = new Email();
    this.buttonClicked = false;
    this.submitted = false;
  }

  submitFeedback(): void {
    this.buttonClicked = true;
    this.sendEmail(this.email).subscribe(
      (str: string) => {
        console.log(str);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sendEmail(email: Email): Observable<String> {
    return this.http.post(this.appService.baseUrl + '/email/feedback', email)
      .map((response: Response) => {
        console.log('Email: ' + JSON.stringify(response));
        return response.text();;
      });
  }

}
