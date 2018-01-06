import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class IOData{
    private ioData;
    private genUrl(fileID){
        let url = "/timeline/" + fileID;
        return url;
    }
    
    public httpGetData(fileID):Observable<any>{
        let url = this.genUrl(fileID);
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