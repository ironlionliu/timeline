import {timelineConfig} from '../configs/timeline.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IOData} from './IOData.class'
export class entity{
    private entity;
    private IOData;
    private handleData(entity){
        this.entity = entity;
    }

    public init(){}
    public update(){}
    public getEntity(fileID){
        return this.IOData.httpGetData(fileID);
    }
    constructor(
        private http: HttpClient,
        private httpHeaders: HttpHeaders
    ){
        this.IOData = new IOData(http,httpHeaders);
    }
}