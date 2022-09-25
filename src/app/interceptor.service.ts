import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor(private loadingService: LoadingService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{

    req = req.clone({
      headers: req.headers.set('KEY', ''+localStorage.getItem("KEY"))
  });


    this.loadingService.isLoading.next(true);
     
   return next.handle(req).pipe(
    finalize(
      () => {
        this.loadingService.isLoading.next(false);
      }
    )
   );
  }
}
