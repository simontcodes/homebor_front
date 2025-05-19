import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const formattedError = {
          message: this.extractMessage(error),
          statusCode: error.status,
          url: error.url || req.url,
        };

        console.error('Global Error:', formattedError);
        return throwError(() => formattedError);
      })
    );
  }

  private extractMessage(error: HttpErrorResponse): string {
    if (error.error?.message) return error.error.message;
    if (typeof error.error === 'string') return error.error;
    if (error.message) return error.message;
    return 'An unexpected error occurred';
  }
}
