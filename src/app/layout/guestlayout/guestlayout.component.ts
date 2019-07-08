import { Component, OnInit } from '@angular/core';
import { stepper,slider,transformer,fader, sliderGuest, guestfader } from 'src/app/router-animations/router-animations.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guestlayout',
  templateUrl: './guestlayout.component.html',
  styleUrls: ['./guestlayout.component.css'],
  animations:[
    fader,
    slider,
    stepper,
    transformer,
    sliderGuest,
    guestfader
  ]
})
export class GuestlayoutComponent implements OnInit {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  constructor() { }

  ngOnInit() {
  }

}
