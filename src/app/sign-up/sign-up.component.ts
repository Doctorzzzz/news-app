import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}

  form!: FormGroup;

  router = inject(Router);
  errorMessage: string | null = null;

  onSubmit() {
    // Handle form submission logic

    // alert ("Hurray! Form Submitted Successfully")
    
    const rawForm = this.form.getRawValue();
    this.authService
      .register(rawForm.email, rawForm.name, rawForm.password)
      .subscribe({
        next: () => {
          console.log('Form submitted!', this.form);
          this.authService.createUserInFirestore(rawForm.name,rawForm.email,rawForm.password)
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          switch (err.code) {
            case 'auth/email-already-in-use':
              this.errorMessage =
                '!Email already in use . Try with different Email';
              break;
            case 'auth/invalid-email':
              this.errorMessage = '!Email is not Valid';
              break;
            case 'auth/weak-password':
              this.errorMessage =
                '!Password must be at least 6 characters long';
              break;
            case 'auth/network-request-failed':
              this.errorMessage = '!Request to server is failed.';
              break;
            default:
              // Handle other errors
              console.error('Error creating user:', err);
              break;
          }
          console.log(err.code);
        },
      });
      //this.authService.createUserInFirestore(rawForm.username,rawForm.email,rawForm.password)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }
}
