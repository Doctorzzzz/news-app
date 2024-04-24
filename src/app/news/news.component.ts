import { DatePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NgFor, DatePipe, UpperCasePipe, NgIf, RouterLink, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news: any[] | undefined;
  form!: FormGroup;
  firestore = inject(Firestore);
  index: string | null | undefined;

  Title: string | null | undefined;
  CountryOfOrigin: string | undefined;
  Description: string | undefined;
  TypeOfNews: string | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isEditMode: boolean = false;

  // toggleEditMode() {
  //   setTimeout(() => {
  //     this.isEditMode = !this.isEditMode;

  //   this.index = this.route.snapshot.paramMap.get('id');
  //   console.log(this.index);
  //   console.log(this.isEditMode);

  //   this.fetchNews();
  //   alert('You Can Edit the desired Fields');
  //   }, 50);

  // }

  updateData(id: string) {
    this.Title = document.getElementById('title')?.innerText;
    this.CountryOfOrigin =
      document.getElementById('countryOfOrigin')?.innerText;
    this.Description = document.getElementById('description')?.innerText;
    this.TypeOfNews = document.getElementById('header')?.innerText;
    const docInstance = doc(this.firestore, 'news', id);
    const updateData = {
      Title: this.Title,
      Description: this.Description,
      CountryOfOrigin: this.CountryOfOrigin,
      TypeOfNews: this.TypeOfNews,
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
    if (this.index) {
      const querySnapshot = await getDocs(collection(this.firestore, 'news'));
      this.news = querySnapshot.docs
        .filter((doc) => {
          return doc.id === this.index;
        })
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      this.isEditMode = !this.isEditMode;
    } else {
      const querySnapshot = await getDocs(collection(this.firestore, 'news'));
      this.news = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    }

    console.log(this.news);
  }

  async ngOnInit(): Promise<void> {
    this.index = this.route.snapshot.paramMap.get('id');
    console.log(this.index);

    await this.fetchNews();
  }
}
