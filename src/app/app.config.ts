import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Verifique o caminho do arquivo

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Certifique-se de que a função provideRouter é chamada corretamente
  ],
};
