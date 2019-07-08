import { Component } from '@angular/core';
import {fader, slider} from './router-animations/router-animations.module'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    fader,
    slider,
  ]
})
export class AppComponent {
  title = 'projectmanager';

}

