import { Injectable, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ApplicationService {

  baseUrl: string = 'https://hand-cricket-server.herokuapp.com';
  // baseUrl: string = 'http://localhost:8080';

  constructor(private http: Http) {}

  wakeServer(): void {
    this._wakeUp().subscribe(
      (str: string) => console.log('wakeServer: ' + str),
      (error) => console.log('Could not wake server: ' + error)
    );
  }

  _wakeUp(): Observable<String> {
    return this.http.get(this.baseUrl)
      .map((response: Response) => {
        console.log('Server WakeUp Call: ' + JSON.stringify(response));
        return response.text();;
      });
  }

}
