import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/*
@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

  username:string = ""
  password:string = ""


  constructor(private authService: AuthService, private userService: UserService, private router:Router){}
  ngOnInit(): void {
      if(this.userService.token)
        this.router.navigate(["/profile"])
  }
  loginForm() {
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        this.userService.saveToken(res.token)
        this.router.navigate(["/profile"])
      },
      error: err => console.error('Login error:', err)
    });
  }


}
*/




import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavigationBarComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  serverError = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.serverError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('LOGIN DATA:', this.loginForm.value);
      this.isSubmitting = false;
    }, 600);
  }

  onForgotPassword() {
    // aici mai târziu pui routing sau dialog
  }
username:string = ""
  password:string = ""


  ngOnInit(): void {
      if(this.userService.token)
        this.router.navigate(["/profile"])
  }
  loginFormReq() {
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        this.userService.saveToken(res.token)
        this.router.navigate(["/profile"])
      },
      error: err => console.error('Login error:', err)
    });
  }


}



