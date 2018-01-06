import { Component, OnInit } from '@angular/core';
import { viewModel } from '../commonUtil/viewModel.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as timelineConfig from '../configs/timeline.config'


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  private testData = { "test": 0 }
  private testCount = 0;

  private timelineData;
  private flags = [];
  private timeline = {};

  private testID = 1;


  private viewModel;
  constructor(
    private http: HttpClient
  ) {
    let httpHeaders = new HttpHeaders();
    this.viewModel = new viewModel(this.http, httpHeaders);
    this.renderTimeline();
  }
  ngOnInit() {

  }
  private init() {
    this.timelineData = timelineConfig["timelineConfig"];
    this.timeline = this.timelineData["timeline"];
    this.flags = this.timelineData["flags"];

    this.timeline["offset"] = 0;
    this.viewModel.renderTimeline(this.timelineData);


  }
  private renderTimeline() {
    this.viewModel.getEntity("time" + this.testID + ".json").subscribe(timelineData => {
      this.timelineData = timelineData;
      this.timeline = timelineData["timeline"];
      this.flags = timelineData["flags"];
      this.viewModel.renderTimeline(this.timelineData);
      this.timeline["offset"] = 0;
    });
  }
  public clickFlag(index) {
    this.goToFlag(index);
  }

  private goToFlag(index) {
    this.timeline["activeFlag"] = index;
    this.timeline["offset"] = this.timeline["offset"] - this.flags[this.timeline["activeFlag"]]["position"];
    this.viewModel.positionFlags(this.timelineData);
    this.timeline["init"] = true;
  }


  toolClick(type) {
    if (type == "magnify") {
      this.timelineData["timeline"]["ruler"] = this.timelineData["timeline"]["ruler"] * 1.6;
    } else if (type == "reduce") {
      this.timelineData["timeline"]["ruler"] = this.timelineData["timeline"]["ruler"] / 1.6;
    } else if (type == "back") {
      this.testID = (this.testID + 1) % 5;

      this.renderTimeline();
    }
    this.viewModel.renderFlags(this.timelineData);
  }
}
