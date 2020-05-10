import { Component, OnInit } from '@angular/core';
import {Task} from 'src/app/core/constants/common.enum';
import {UtilsService} from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.scss']
})
export class TaskDetailsPageComponent implements OnInit {
  taskDetail: Task;

  constructor(private utils: UtilsService) {
  }

  ngOnInit(): void {
    this.taskDetail = this.utils.taskDetails;
  }
}
