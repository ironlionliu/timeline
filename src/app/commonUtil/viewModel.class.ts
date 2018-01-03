import { entity } from './entity.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
export class viewModel {
    private viewModel;
    private entity;
    private timeline;
    private ruler;
    private flagLayer = {
        "top": null,
        "middle": null,
        "bottom": null
    }
    public getEntity(): Observable<any> {
        return this.entity.getEntity();
    }

    public initTimeline(timelineData) {
        let timeline = timelineData["timeline"];
        timeline["containerWidth"] = $("#" + timeline["containerId"]).width();
        timeline["containerHeight"] = $("#" + timeline["containerId"]).height();
        timeline["offset"] = 0;

        timeline["flagHeight"] = timeline["containerHeight"] * 0.65 / 3;
        timeline["flagMargin"] = timeline["containerHeight"] * 0.35 / 4;
        
        this.flagLayer["middle"] = timeline["flagMargin"] * 2 + timeline["flagHeight"];
        this.flagLayer["top"] = timeline["flagMargin"];
        this.flagLayer["bottom"] = timeline["flagMargin"] * 3 + timeline["flagHeight"] * 2;


    }
    public initFlags(timelineData) {

        let timeline = timelineData["timeline"];
        let flags = timelineData["flags"];
        if (!timeline["ruler"]) {
            this.ruler = this.calRuler(flags, timeline["containerWidth"] * 0.5 - timeline["flagWidth"]);
            timeline["ruler"] = this.ruler;
        } else {
            this.ruler = timeline["ruler"];
        }

        this.setRows(flags, timeline);


    }

    private setRows(flags, timeline) {
        var baseTime = flags[0]["time"];
        flags.forEach((flag, index, flags) => {

            

            flag["position"] = timeline["containerWidth"] * 1.5 + this.calInterval(baseTime, flag["time"]) * this.ruler;

            if (index > 0 && this.calInterval(flags[index - 1]["time"], flag["time"]) * this.ruler < timeline["flagWidth"]) {
                if (index > 1 && this.calInterval(flags[index - 2]["time"], flag["time"]) * this.ruler < timeline["flagWidth"]) {
                    flag["row"] = this.restRow(flags[index - 1]["row"],flags[index - 2]["row"]);
                }else{
                    flag["row"] = this.nextRow(flags[index - 1]["row"]);
                }
            } else {
                flag["row"] = "middle";
            }
            flag["layer"] = this.flagLayer[flag["row"]];
        });
    }
    private restRow(row1, row2) {
        var rows = ["middle","top","bottom"];
        let index = 3 - rows.indexOf(row1) - rows.indexOf(row2);
        return rows[index];
    }
    private nextRow(row){
        var rows = ["middle","top","bottom"];
        let index = (rows.indexOf(row) + 1)%3;
        return rows[index];
    }

    public positionFlags(timelineData) {
        let timeline = timelineData["timeline"];
        let flags = timelineData["flags"];
        let offset = flags[timeline["activeFlag"]]["position"] - flags[0]["position"];
        timeline["offset"] = offset;

    }
    /*interval单位是天*/
    private calInterval(time1, time2) {
        return this.calTime(time2) - this.calTime(time1);
    }
    private calTime(time) {

        let timearr = time.split("-");
        let timefloat = timearr[0] * 365 + timearr[1] * 30 + timearr[2];
        return timefloat;
    }
    /*  一天对应的长度（day=>left） */
    private calRuler(flags, timeWidth) {
        flags.sort((flag1, flag2) => {
            return this.calTime(flag1["time"]) - this.calTime(flag2["time"]);
        });
        let ruler = timeWidth / (this.calInterval(flags[0]["time"], flags[flags.length - 1]["time"]));
        return ruler;
    }
    /*interval转换为当前时间轴上的距离*/
    private interval2Distance(interval) { }
    constructor(
        private http: HttpClient,
        private httpHeaders: HttpHeaders
    ) {
        this.entity = new entity(http, httpHeaders);
    }
}