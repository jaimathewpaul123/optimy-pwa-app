import { Component, OnInit } from '@angular/core';
import {Task, TaskRequestBody} from 'src/app/core/constants/common.enum';
import {UtilsService} from 'src/app/core/services/utils.service';
import {Constants} from 'src/app/core/constants/constants';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.scss']
})
export class TaskDetailsPageComponent implements OnInit {
  taskDetail: Task;
  id: number;
  constructor(private utils: UtilsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe( params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.getTaskDetails();
  }

  getTaskDetails() {
    const requestBody: TaskRequestBody = {
      id: this.id
    };
    this.utils.getTaskDetails(requestBody).subscribe(response => {
      this.taskDetail = response;
    }, catchError(e => of(e)));
  }

  back(){
    this.router.navigateByUrl(Constants.routes.taskHome);
  }
}
