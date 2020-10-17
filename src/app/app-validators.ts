import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppValidators {
  // example of external service
  private static http: HttpClient;

  constructor(http: HttpClient) {
    AppValidators.http = http;
  }

  public static uniqueEmail(
    control: FormControl
  ): Observable<null | ValidationErrors> {
    // console.log("uniqueEmail init");
    return of(control.value as string).pipe(
      // tap(email => console.log("uniqueEmail started, email:", email)),
      delay(1500),
      map(email => {
        if (email === 'padx@gmx.net') {
          return { uniqueEmail: email };
        }
        return null;
      })
      // tap(result => console.log("uniqueEmail ended, result:", result))
    );
  }

  public static startsWithCapitalLetter(
    control: FormControl
  ): null | ValidationErrors {
    console.log('startsWithCapitalLetter value:', control.value);
    const value = String(control.value);
    return value.charAt(0) === value.charAt(0).toUpperCase()
      ? null
      : { startsWithCapitalLetter: true };
  }
}
