import { Injectable } from '@angular/core';
import {HttpClientWrapperService} from 'src/app/core/services/http-client-wrapper.service';
import {Constants} from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private httpClientWrapper: HttpClientWrapperService) { }

  login() {
    const body = {
      email: 'email@example.com',
      password: '2kf8210d0',
      tenantid: 3
    };
    return this.httpClientWrapper.post('sample One', Constants.apiPaths.login, body);
  }

}
