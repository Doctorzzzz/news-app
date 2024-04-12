import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './add-news/add-news.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'/home',
        pathMatch:'full',
      },
      {
        path: 'login',
        component:LoginComponent ,
      },
      {
        path: 'signup',
        component:SignUpComponent ,
      },
      {
        path: 'home',
        component:HomeComponent ,
      },
      {
        path: 'news',
        component:NewsComponent ,
      },
      {
        path: 'add-news',
        component:AddNewsComponent ,
      },
];
