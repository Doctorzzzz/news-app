import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterOutlet,DatePipe,UpperCasePipe,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  news: any[] | undefined;
  firestore = inject(Firestore);
  constructor(){}


  async fetchNews(): Promise<void> {
    const querySnapshot = await getDocs(collection(this.firestore, 'news'));
    this.news = querySnapshot.docs.map((doc) => ({
      ...doc.data(), // Spread the document data
      id: doc.id, // Add the document ID with the name UID
    }));
    console.log(this.news);
  }



  async ngOnInit(): Promise<void> {
    await this.fetchNews();
  }


}
