import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { LoggerService } from '../logger.service';
import { HttpMethod } from '@ngneat/spectator';
import { sourceContext } from '../enrichers/source-context-enricher';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/loki/api/v1/push')) return next.handle(req);
    if (req.method === HttpMethod.OPTIONS) return next.handle(req);

    sourceContext(LogHttpInterceptor, () => {
      this.logger.debug('Request to {Method} {Endpoint} has been started', req.method, req.urlWithParams);
      this.logger.verbose('Request: {Request}', JSON.stringify(req));
    });
    const started = performance.now();
    return next.handle(req).pipe(
      tap((response) => {
        if (response.type === 0) return;

        sourceContext(LogHttpInterceptor, () => {
          this.logger.verbose('Response: {Response}', JSON.stringify(response));
        });
      }),
      finalize(() => {
        sourceContext(LogHttpInterceptor, () => {
          this.logger.debug('Request to {Method} {Endpoint} has been finished in {DurationMS}ms', req.method, req.urlWithParams, Math.round(performance.now() - started));
        });
      })
    );
  }
}
