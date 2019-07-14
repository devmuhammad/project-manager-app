import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DefaultlayoutService {

  constructor(private router: Router) {}
  navigateToPath(path) {
      this.router.navigateByUrl(path);
    }
    get user(): any {
      return localStorage.getItem('profile');
  }



}
