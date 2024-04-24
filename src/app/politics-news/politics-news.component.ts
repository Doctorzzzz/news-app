import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politics-news',
  standalone: true,
  imports: [RouterLink,DatePipe,NgFor,UpperCasePipe],
  templateUrl: './politics-news.component.html',
  styleUrl: './politics-news.component.css'
})
export class PoliticsNewsComponent implements OnInit {
     constructor(){}
     firebaseAuth = inject(Auth);
     
     news: any[] | undefined;
     firestore = inject(Firestore);

     async fetchNews(): Promise<void> {
      const newsCollectionRef = collection(this.firestore, 'news');
      const q = query(
        newsCollectionRef,
        where('TypeOfNews', '==', 'Politics')
      );
      const querySnapshot = await getDocs(q);
      this.news = querySnapshot.docs.map((doc) => ({
        ...doc.data(), // Spread the document data
        id: doc.id, // Add the document ID with the name UID
      }));
      console.log(this.news);
    }

     async ngOnInit(): Promise<void> {
      
        this.fetchNews();
     
      }
}
