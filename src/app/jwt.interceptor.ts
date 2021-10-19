import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from "./api.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem(ApiService.JWT_STORAGE_KEY)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem(ApiService.JWT_STORAGE_KEY)}`
        }
      });
    }

    return next.handle(request);
  }
}
