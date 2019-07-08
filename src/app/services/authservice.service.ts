import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { IAppState, store } from '../store';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http"
import { BaseApi } from '../helpers/constants';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {

  constructor(
    private http: HttpClient,
    private router:Router,
     private toastr:ToastrService) { }

     login(payload: object):Observable<any>{
    return this.http.post<any>(BaseApi['URL'] + BaseApi['PATH']['LOGIN'], payload)

  }

}
