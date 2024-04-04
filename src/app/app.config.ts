import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'news-app-8f161',
          appId: '1:472616733622:web:1a35e472802904dfcd4f17',
          storageBucket: 'news-app-8f161.appspot.com',
          apiKey: 'AIzaSyCXb2noqEl4wz_CW56mdzmL_bsq8OWUpYc',
          authDomain: 'news-app-8f161.firebaseapp.com',
          messagingSenderId: '472616733622',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideMessaging(() => getMessaging())),
  ],
};
