import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

  constructor(private sevice:ProjectService) { }
}
