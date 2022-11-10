import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private database:HttpClient) {

  }

  get (url:String):Observable<any>{
    return this.database.get("http://localhost:8080/api"+url) as Observable<any>
  }

  put (url:String, putdata:any):Observable<any> {
    return this.database.put("http://localhost:8080/api"+url,putdata) as Observable<any>
  }

  post (url:String, postdata:any):Observable<any>{
    return this.database.post("http://localhost:8080/api"+url,postdata) as Observable<any>
  }

  del(url:String):Observable<any>{
    return this.database.delete("http://localhost:8080/api"+url) as Observable<any>
  }
}
