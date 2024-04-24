import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, LoginComponent,UpperCasePipe,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private Router: Router) {}

  firebaseAuth = inject(Auth);
  firestore=inject(Firestore);
  userLoggedIn = false;

  signOut() {
    this.auth.logOut();
    this.Router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
        console.log('user is logged in');
        console.log(this.firebaseAuth.currentUser);
        
       
      } else {
        this.userLoggedIn = false;
        console.log('user is not logged in');
      }
    });
   







  }
}
