import { DatePipe, NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit,  inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NgFor,DatePipe,UpperCasePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news: any[] | undefined;
  form!:FormGroup
  firestore = inject(Firestore);
  constructor(){}

  

   async ngOnInit(): Promise<void> {
    const querySnapshot = await getDocs(collection(this.firestore, 'news'));
    this.news = querySnapshot.docs.map(doc => doc.data());
    console.log(this.news);
    
   }
}
