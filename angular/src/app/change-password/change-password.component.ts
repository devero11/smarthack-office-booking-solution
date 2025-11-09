/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

}
*/
import { Component } from '@angular/core';
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
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavigationBarComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  // 1 = email step, 2 = new password step
  step = 1;

  emailForm: FormGroup;
  passwordForm: FormGroup;

  isSubmitting = false;
  serverError = '';

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [this.passwordsMatchValidator] }
    );
  }

  get ef() {
    return this.emailForm.controls;
  }

  get pf() {
    return this.passwordForm.controls;
  }

  get passwordMismatch(): boolean {
    return (
      this.passwordForm.hasError('passwordsDontMatch') &&
      this.passwordForm.get('confirmPassword')?.touched === true
    );
  }

  private passwordsMatchValidator(group: AbstractControl) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    if (p && c && p !== c) {
      return { passwordsDontMatch: true };
    }
    return null;
  }

  onSendEmail() {
    this.serverError = '';
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // simulăm trimiterea mailului
    setTimeout(() => {
      this.isSubmitting = false;
      alert('Reset link sent to ' + this.emailForm.value.email);
      this.step = 2;
    }, 700);
  }

  onChangePassword() {
    this.serverError = '';
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      alert('Password changed successfully!');
      // poți face redirect spre login aici mai târziu
      this.passwordForm.reset();
    }, 700);
  }
}
