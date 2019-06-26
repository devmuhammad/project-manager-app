import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  scrollRight:boolean =false;
  scrollLeft:boolean = false;
  constructor( private service: ProjectService) {
    window.setInterval(() => {
      this.scrollRight && window.scrollBy(1,0);
      this.scrollLeft && window.scrollBy(-1, 0);
     })
  }

  allProjects =[];
  ngOnInit() {
    this.service.gettableData().subscribe(items=>{
     let projects =items.map(item=>{
       return{
         ...item
       }
     })
     this.allProjects = projects;

    })
  }

}
