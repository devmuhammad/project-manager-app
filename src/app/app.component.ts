import { Component, ElementRef, Inject, OnInit, Renderer2, PLATFORM_ID } from '@angular/core';
import {fader, slider} from './router-animations/router-animations.module'
import * as FontFaceObserver from 'fontfaceobserver';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    // fader,
    // slider,
  ]
})
export class AppComponent implements OnInit {
  title = 'projectmanager';
  
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    // ...
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Avoid flash of icon placeholder text during SSR -> client JS handover.
      const materialIcons = new FontFaceObserver('Material Icons');
      materialIcons.load(null, 5000)
        .then(() => this.renderer.addClass(this.elementRef.nativeElement, 'material-icons-loaded'));

      // ...existing client-side-only inits.
    } else {
      // On the server side, add the class to show icons immediately.
      this.renderer.addClass(this.elementRef.nativeElement, 'material-icons-loaded');
    }
  }
}


