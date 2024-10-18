import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';  // Import function
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';  

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)  
  ] 
}).catch(err => console.error(err));
