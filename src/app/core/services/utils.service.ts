import { Injectable } from '@angular/core';
import {HttpClientWrapperService} from 'src/app/core/services/http-client-wrapper.service';
import {Constants} from 'src/app/core/constants/constants';
import {catchError, map} from 'rxjs/operators';
import {ListResponse, Task, UserInfo} from 'src/app/core/constants/common.enum';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  taskList: Task[];
  taskDetails: Task;
  isLoggedIn = false;
  constructor(private httpClientWrapper: HttpClientWrapperService) { }

  login(loginRequestBody): Observable<UserInfo | any> {
    return this.httpClientWrapper.post('sample', Constants.apiPaths.login, loginRequestBody)
      .pipe(map((res: UserInfo) => {
        this.setUserToken(res.user_token);
        this.isLoggedIn = true;
        return res;
    })).pipe(
      catchError(e => {
        return throwError(e);
      })
      );
  }

  getTaskList(requestBody) {
    if (this.taskList) {
      return of(this.taskList);
    } else {
      return this.httpClientWrapper.post('sample', Constants.apiPaths.getTaskList, requestBody)
        .pipe(map((res: ListResponse) => {
          this.taskList = res.data.map(task => {
            task.attr = JSON.parse(task.attr);
            return task;
          });
          return this.taskList;
        }));
    }
  }
  getTaskDetails(id) {
     this.taskList.filter(item => {
      if (item.id === id) {
        this.taskDetails = item;
      }
    });
  }
  setUserToken(userToken) {
    localStorage.setItem(Constants.userToken, userToken);
  }
}
