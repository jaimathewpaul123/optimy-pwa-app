import { Component, OnInit } from '@angular/core';
import {Constants} from 'src/app/core/constants/constants';
import {catchError} from 'rxjs/operators';
import {UtilsService} from 'src/app/core/services/utils.service';
import {Task, TaskRequestBody} from 'src/app/core/constants/common.enum';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss']
})
export class TaskListPageComponent implements OnInit {
  taskList: Task[];
  constructor(private utils: UtilsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    const requestBody: TaskRequestBody = {
      parent_id: Constants.parent_id
    };
    this.utils.getTaskList(requestBody).subscribe(response => {
      this.taskList = response;
    }, catchError(e => of(e)));
  }

  getTaskDetails(id) {
    this.utils.getTaskDetails(id);
    this.router.navigateByUrl(`${Constants.routes.taskHome}/${id}`);
  }
}
