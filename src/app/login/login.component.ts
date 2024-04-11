import { Component, Injectable, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  form!: FormGroup;
  errorMessage: string | null = null;
  
  onSubmit() {
    const rawForm = this.form.getRawValue();
    this.authService
      .login(
        rawForm.email,

        rawForm.password
      )
      .subscribe({
        next: () => {
          console.log("successfully logged in");
          
         
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.errorMessage = err.code;
          console.log(err);
          
        },
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
