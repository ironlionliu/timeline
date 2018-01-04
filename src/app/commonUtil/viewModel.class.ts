import { entity } from './entity.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
export class viewModel {
    private viewModel;
    private entity;
    private ruler;
    private flagLayer = {
        "top": null,
        "middle": null,
        "bottom": null
    }
    public getEntity(): Observable<any> {
        return this.entity.getEntity();
    }

    public renderTimeline(timelineData) {
        let timeline = timelineData["timeline"];
        timeline["containerWidth"] = $("#" + timeline["containerId"]).width();
        timeline["containerHeight"] = $("#" + timeline["containerId"]).height();
        timeline["offset"] = 0;

        timeline["flagHeight"] = timeline["containerHeight"] * 0.95 * 0.65 / 3;
        timeline["flagMargin"] = timeline["containerHeight"] * 0.9 * 0.35 / 4;
        
        this.flagLayer["middle"] = timeline["flagMargin"] * 2 + timeline["flagHeight"];
        this.flagLayer["top"] = timeline["flagMargin"];
        this.flagLayer["bottom"] = timeline["flagMargin"] * 3 + timeline["flagHeight"] * 2;
        this.renderFlags(timelineData);
        

    }
    public renderFlags(timelineData) {

        let timeline = timelineData["timeline"];
        let flags = timelineData["flags"];
        if (!timeline["ruler"]) {
            this.ruler = this.calRuler(flags, timeline["containerWidth"] * 0.5 - timeline["flagWidth"]);
            timeline["ruler"] = this.ruler;
        } else {
            this.ruler = timeline["ruler"];
        }

        this.setRows(flags, timeline);
        this.renderRulerMarkers(timelineData);
        console.log(timeline["rulerMarkers"]);
    }

    private renderRulerMarkers(timelineData) {
        var timeline = timelineData["timeline"];
        var flags = timelineData["flags"];
        this.sortFlags(flags);
        this.genRulerMarkerTime(timeline,flags);
    }

    private genRulerMarkerTime(timeline,flags){
        //days是半个可视时间轴的长度对应的天数，timeLevel是ruler级别，baseDay是drag块0点对应的时间相距公元零年的天数。
        var days = this.calInterval(flags[0]["time"], flags[flags.length - 1]["time"]);
        var timeLevel = "century";//century,decade,year,month,day
        var baseDay = this.calBaseDay(timeline,flags);
        var daysInterval = days/(timeline["rulerNum"]/timeline["dragWidth"]/2);
        var rulerMarkers = timeline["rulerMarkers"];
        if(timeLevel == "century"){
            let timeOrigin = Math.ceil(baseDay/365/100);
            let timeNext = Math.round((baseDay + daysInterval)/365/100);
            let timeInterval = timeNext - timeOrigin;
            for(let i = 0; i < timeline["rulerNum"]; i++){
                let _rulerMarker = {
                    "time": null,
                    "position": null
                };
                rulerMarkers[i] = _rulerMarker;
                rulerMarkers[i]["time"] = (timeOrigin + i * timeInterval)*100 + "/1/1";
                rulerMarkers[i]["position"] = this.time2Position(rulerMarkers[i]["time"],flags,timeline);//rulerMarkers[i]["time"] * timeline["ruler"];
            }

        }else if(timeLevel == "decade"){
            let timeOrigin = Math.ceil(baseDay/365/10);
            let timeNext = Math.round((baseDay + daysInterval)/365/10);
            let timeInterval = timeNext - timeOrigin;
            for(let i = 0; i < timeline["rulerNum"]; i++){
                rulerMarkers[i]["time"] = timeOrigin + i * timeInterval;
                rulerMarkers[i]["position"] = this.time2Position(rulerMarkers[i]["time"],flags,timeline);//rulerMarkers[i]["time"] * timeline["ruler"];
            }
        }else if(timeLevel == "year"){
            let timeOrigin = Math.ceil(baseDay/365);
            let timeNext = Math.round((baseDay + daysInterval)/365);
            let timeInterval = timeNext - timeOrigin;
            for(let i = 0; i < timeline["rulerNum"]; i++){
                rulerMarkers[i]["time"] = timeOrigin + i * timeInterval;
                rulerMarkers[i]["position"] = rulerMarkers[i]["time"] * timeline["ruler"];
            }
        }else if(timeLevel == "month"){
            let timeOrigin = Math.ceil(baseDay/365/100);
            let timeNext = Math.round((baseDay + daysInterval)/365/100);
            let timeInterval = timeNext - timeOrigin;
            for(let i = 0; i < timeline["rulerNum"]; i++){
                rulerMarkers[i]["time"] = timeOrigin + i * timeInterval;
                rulerMarkers[i]["position"] = rulerMarkers[i]["time"] * timeline["ruler"];
            }
        }else if(timeLevel == "day"){
            let timeOrigin = Math.ceil(baseDay/365/100);
            let timeNext = Math.round((baseDay + daysInterval)/365/100);
            let timeInterval = timeNext - timeOrigin;
            for(let i = 0; i < timeline["rulerNum"]; i++){
                rulerMarkers[i]["time"] = timeOrigin + i * timeInterval;
                rulerMarkers[i]["position"] = rulerMarkers[i]["time"] * timeline["ruler"];
            }
        }
    }
    private calBaseDay(timeline,flags){
        var days = this.calInterval(flags[0]["time"], flags[flags.length - 1]["time"]);
        var baseDay = this.calTime(flags[flags.length - 1]["time"]) - days*(timeline["dragWidth"] - 1 + 2);
        return baseDay;
    }


    private time2Position(time,flags,timeline){

        console.log(time);
        let baseTime = flags[0]["time"];
        let position = timeline["containerWidth"] * 0.5 * timeline["dragWidth"] + this.calInterval(baseTime, time) * this.ruler;
        return position;
    }
    private setRows(flags, timeline) {
        var baseTime = flags[0]["time"];
        flags.forEach((flag, index, flags) => {
            // flag["position"] = timeline["containerWidth"] * 1.5 + this.calInterval(baseTime, flag["time"]) * this.ruler;

            flag["position"] = this.time2Position(flag["time"], flags, timeline);
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

    private positionFlags(timelineData) {
        let timeline = timelineData["timeline"];
        let flags = timelineData["flags"];
        let offset = flags[timeline["activeFlag"]]["position"] - flags[0]["position"];
        timeline["offset"] = offset;

    }

    private sortFlags(flags){
        flags.sort((flag1, flag2) => {
            return this.calTime(flag1["time"]) - this.calTime(flag2["time"]);
        });
        return flags;
    }

    
    /*interval单位是天*/
    private calInterval(time1, time2) {
        return this.calTime(time2) - this.calTime(time1);
    }
    private calTime(time) {
        let timearr = time.split("/");
        let timefloat = timearr[0] * 365 + timearr[1] * 30 + timearr[2]*1;
        return timefloat;
    }
    /*  一天对应的长度（day=>left） */
    private calRuler(flags, timeWidth) {
        this.sortFlags(flags);
        let ruler = timeWidth / (this.calInterval(flags[0]["time"], flags[flags.length - 1]["time"]));
        return ruler;
    }
    
    constructor(
        private http: HttpClient,
        private httpHeaders: HttpHeaders
    ) {
        this.entity = new entity(http, httpHeaders);
    }
}