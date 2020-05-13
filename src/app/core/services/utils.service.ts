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

  getTaskList(requestBody): Observable<Task[]> {
    if (this.taskList) {
      return of(this.taskList);
    } else {
     return this.callTaskApi(requestBody).pipe(map((res: ListResponse) => {
        this.taskList = res.data.map(task => {
          task.attr = JSON.parse(task.attr);
          return task;
        });
        return this.taskList;
      }));
    }
  }
  getTaskDetails(requestBody): Observable<Task> {
     return this.callTaskApi(requestBody).pipe(map((res: ListResponse) => {
       res.data[0].attr = JSON.parse(res.data[0].attr);
       return res.data[0];
     }));
  }
  callTaskApi(requestBody) {
    return this.httpClientWrapper.post('sample', Constants.apiPaths.getTaskList, requestBody);
  }
  setUserToken(userToken) {
    localStorage.setItem(Constants.userToken, userToken);
  }
  setLogInStatus(status) {
    this.isLoggedIn = status;
  }
}
