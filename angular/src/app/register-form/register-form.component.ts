import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/*
@Component({
  selector: 'app-register-form',
  imports: [FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{

  username:string = ""
  email:string = ""
  password:string = ""

  constructor(private router:Router,private authService: AuthService, private userService: UserService){}

  ngOnInit(): void {
      if(this.userService.token)
        this.router.navigate(["/profile"])
  }

  registerForm() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: res => {
        this.userService.saveToken(res.token)
        this.router.navigate(["/profile"])
      },
      error: err => console.error('Register error:', err)
    });
  }


}
*/





import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavigationBarComponent],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  serverError = '';

  constructor(private fb: FormBuilder,private router:Router,private authService: AuthService, private userService: UserService) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [this.passwordsMatchValidator],
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  get passwordMismatch(): boolean {
    return (
      this.registerForm.hasError('passwordsDontMatch') &&
      this.registerForm.get('confirmPassword')?.touched === true
    );
  }

  // validator de nivel de form
  private passwordsMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (pass && confirm && pass !== confirm) {
      return { passwordsDontMatch: true };
    }
    return null;
  }

  onSubmit() {
    this.serverError = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('REGISTER DATA:', this.registerForm.value);
      this.isSubmitting = false;
      this.registerForm.reset();
    }, 800);
  }
  username:string = ""
  email:string = ""
  password:string = ""

  ngOnInit(): void {
      if(this.userService.token)
        this.router.navigate(["/profile"])
  }

  registerFormReq() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: res => {
        this.userService.saveToken(res.token)
        this.router.navigate(["/profile"])
      },
      error: err => console.error('Register error:', err)
    });
  }
}







