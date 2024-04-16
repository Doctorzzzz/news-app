import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NgFor, DatePipe, UpperCasePipe, NgIf],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news: any[] | undefined;
  form!: FormGroup;
  firestore = inject(Firestore);
  index:number=0;

  constructor(private auth: AuthService, private router: Router,private route: ActivatedRoute) {}

  isEditMode: boolean = false;
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    alert('You Can Edit the desired Fields');
  }

  updateData(id: string) {
    const docInstance = doc(this.firestore, 'news', id);
    const updateData = {
      Title: 'vinod saini',
    };
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log(`Data Updated Successfully  at ${id}`);
        // Re-fetch the data after updating
        this.fetchNews();
        this.router.navigateByUrl('/news');
        this.isEditMode = !this.isEditMode;
        alert('Changes saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        console.log(params['id']);
  
        this.index = params['id'];}
  })

}}
