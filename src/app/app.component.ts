import { Component } from '@angular/core';





/*************************************************/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IOData} from './commonUtil/IOData.class';
import {viewModel} from './commonUtil/viewModel.class';

/*************************************************/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    private httpClient: HttpClient,
  ) {
  }
}
