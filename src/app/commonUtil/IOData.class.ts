import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class IOData{
    private ioData;
    private genUrl(){
        let url = "/timeline/time.json";
        return url;
    }
    
    public httpGetData(getData):Observable<any>{
        let url = this.genUrl();
        let getDataStr = JSON.stringify(getData);
        return this.http.get(
            url,
            {
                headers: this.httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded'),
            }
        );
    }
    public httpSetData(){}
    public getData(){
        
    }
    constructor(
        private http: HttpClient,
        private httpHeaders: HttpHeaders
    ) {
    }
    
}