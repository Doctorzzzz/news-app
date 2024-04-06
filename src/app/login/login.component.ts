import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  onSubmit() {
    // Handle form submission logic
    console.log('Form submitted!', this.form);
    // alert ("Hurray! Form Submitted Successfully")
  }

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required]),
      
    });
  }
}
