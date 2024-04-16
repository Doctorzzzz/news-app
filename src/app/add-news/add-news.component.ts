import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css',
})
export class AddNewsComponent implements OnInit {
  firestore = inject(Firestore);
  firebaseAuth = inject(Auth);
  currentUserUid: string | undefined;

  constructor(private auth: AuthService,private router:Router) {}
  form!: FormGroup;
 

  onSubmit() {
    console.log('addNews called()');
    
    // Below function will add the news to firestore
    const rawForm = this.form.getRawValue();
    this.auth
      .getUserIdByUsername(this.firebaseAuth.currentUser?.displayName)
      .then((res) => {
        this.currentUserUid = res ?? undefined;
        const dbInstance = addDoc(
          collection(this.firestore, `users/${this.currentUserUid}/news`),
          {
            Title: rawForm.title,
            imagePath: rawForm.imagePath,
            Description: rawForm.description,
            CountryOfOrigin: rawForm.country,
            TypeOfNews: rawForm.newstype,
            dateTimeCreated:new Date(),
            authorName: this.firebaseAuth.currentUser?.displayName,
          }
        );
        const dbInstance1 = addDoc(
          collection(this.firestore, `news`),
          {
            Title: rawForm.title,
            imagePath: rawForm.imagePath,
            Description: rawForm.description,
            CountryOfOrigin: rawForm.country,
            TypeOfNews: rawForm.newstype,
            authorName: this.firebaseAuth.currentUser?.displayName,
            dateTimeCreated:new Date()
          }
        ).then(()=>{ this.form.reset();
          this.router.navigateByUrl("/news")
        });
        console.log(' news added successfully at ' + dbInstance);
        console.log(' news added successfully at ' + dbInstance1);
      });

   
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      imagePath: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      newstype: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
    });
  }
}
