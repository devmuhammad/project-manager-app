import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { store } from '../store';
@Injectable({
  providedIn: 'root'
})
export class DefaultlayoutService {

  constructor(private router: Router) {}
  navigateToPath(path) {
      this.router.navigateByUrl(path);
    }
    get user(): any {
      return JSON.parse(localStorage.getItem('profile'));
  }

  handleBreadChrome(payload: object) {
   return store.dispatch({type: 'BREADCHROME', payload});
  }
  geteBreadChrome(): Observable<any[]> {
    const { chrome } = store.getState().appState;
    // console.log(chrome);
    return Observable.of(chrome);
  }

}
