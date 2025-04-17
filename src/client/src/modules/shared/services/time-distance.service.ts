import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TuiFormatDateService } from '@taiga-ui/core';
import { map, Observable, of, timer } from 'rxjs';
import { formatDistance } from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class TimeDistanceService extends TuiFormatDateService {
  private readonly delay$ = isPlatformBrowser(inject(PLATFORM_ID))
      ? timer(0, 1000)
      : of(0);

      override format(timestamp: number): Observable<string> {
        return this.delay$.pipe(map(() => formatDistance(Date.now(), timestamp)))
      }
}
