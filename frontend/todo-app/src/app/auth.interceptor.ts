import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './Services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Clone the request and add the auth header
    const authRequest = req.clone({
      headers: req.headers.set('x-auth-token', token),
    });
    return next(authRequest);
  }

  return next(req);
};
