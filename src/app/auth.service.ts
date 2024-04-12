import { Injectable, OnInit, inject } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import {  Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';

import { Observable, from,  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  
  constructor(){
   
   
    
  }

  register(email: string, username: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      updateProfile(response.user, { displayName: username });
      
      
    });

    return from(promise);
  }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }
  async createUserInFirestore(
    username: string,
    email: string,
    password: string
  ) {
    const dbInstance = await addDoc(collection(this.firestore, 'users'), {
      Name: username,
      email: email,
      Password: password,
    });
    console.log(' user added successfully at' + dbInstance.id);
  }

  logOut() {
    this.firebaseAuth
      .signOut()
      .then(() => {
        console.log('successfully signed out');
      })
      .catch((err) => {
        console.log('signed ends with error' + err);
      });
  }

  
  async  getUserIdByUsername(username: any): Promise<string | null> {
    const usersCollectionRef = collection(this.firestore, 'users');
    const q = query(usersCollectionRef, where('Name', '==', username));
   
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
       // Assuming you want the first document's ID
       
       return querySnapshot.docs[0].id;
    } else {
       return null;
    }
   }
   
   

  ngOnInit(): void {}
}
