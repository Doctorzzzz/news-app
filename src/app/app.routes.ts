import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { PoliticsNewsComponent } from './politics-news/politics-news.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'/news',
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
        path: 'news/:id',
        component:NewsComponent ,
      },
      {
        path: 'add-news',
        component:AddNewsComponent ,
      },
      {
        path: 'politics',
        component:PoliticsNewsComponent ,
      },
];
