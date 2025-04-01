import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { LoggerService } from '../logger.service';
import { HttpMethod } from '@ngneat/spectator';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/loki/api/v1/push')) return next.handle(req);
    if (req.method === HttpMethod.OPTIONS) return next.handle(req);

    const logger = inject(LoggerService);

    logger.debug('Request to {Method} {Endpoint} has been started', req.method, req.urlWithParams);
    const started = performance.now();
    return next.handle(req).pipe(
      finalize(() => {
        logger.debug('Request to {Method} {Endpoint} has been finished in {DurationMS}ms', req.method, req.urlWithParams, Math.round(performance.now() - started));
      })
    );
  }
}
