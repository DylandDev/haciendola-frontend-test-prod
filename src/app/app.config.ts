import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 4000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
  ],
};
