import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, delay, map, mergeMap, retryWhen} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService {

  constructor(private httpClient: HttpClient) { }

  public post<I, T>(userInContext: string, apiRoute: string, body: I): Observable<T> {
    const httpCall = this.httpClient.post<T>(environment.baseApiUrl + apiRoute, body, {
      headers: this.buildHeaders(userInContext)
    });

    return this.retryHttp(apiRoute, httpCall);
  }

  private retryHttp<T>(apiRoute: string, response: Observable<T>): Observable<T> {
    let retries = 1;
    return response.pipe(
      retryWhen((errors => {
        return errors.pipe(
          delay(500),
          mergeMap(error => (retries-- > 0 && error.status !== 401) ? of(error) : throwError(error))
        );
      })),
      map((value) => {
        if ((value as any).error) {
          throw new Error((value as any).error);
        }
        return value;
      }),
      catchError(this.handleError(apiRoute, null))
    );
  }

  private handleError<T>(apiRoute: string, result?: T) {
    return (error: any): Observable<T> => {
      throw new Error(error && error.error && error.error.message || error && error.message || error);
    };
  }

  private buildHeaders(userInContext: string): any {
    const authorization = 'r0MrA268ORAobX53qkoaohaA7g9ek3JJ';

    const header = {
      'x-username': userInContext || '',
      'x-request-id': Math.random().toString(36).replace('0.', ''),
    };

    if (authorization) {
      return {
        ...header,
        apptoken: authorization
      };
    }

    return header;
  }

}
