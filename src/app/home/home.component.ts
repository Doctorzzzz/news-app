import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DatePipe, UpperCasePipe, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  news: any[] | undefined;
  firestore = inject(Firestore);
  constructor(private auth: AuthService, private router: Router) {}

  firebaseAuth = inject(Auth);
  currentUserUid: string | undefined;

  deleteData(id: string) {
    const docInstance = doc(this.firestore, `news`, id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Data Deleted Successfully');
        this.fetchNews();
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async fetchNews(): Promise<void> {
    const newsCollectionRef = collection(this.firestore, 'news');
    const q = query(
      newsCollectionRef,
      where('authorName', '==', this.firebaseAuth.currentUser?.displayName)
    );
    const querySnapshot = await getDocs(q);
    this.news = querySnapshot.docs.map((doc) => ({
      ...doc.data(), // Spread the document data
      id: doc.id, // Add the document ID with the name UID
    }));
    console.log(this.news);
  }

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.fetchNews();
    }, 1000);
  }
}
