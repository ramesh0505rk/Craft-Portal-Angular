import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  emailFormGroup: FormGroup

  allowEnterOtp: boolean = false;
  disableEmailAndOtpBtn: boolean = false;

  constructor() {
    this.emailFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onGetOtp() {
    this.allowEnterOtp = true;
    this.disableEmailAndOtpBtn = true;

    const email = this.emailFormGroup.get('email')?.value;
    console.log("OTP sent to:", email);

    this.emailFormGroup.get('email')?.disable();

    setTimeout(() => {
      const otpI1 = document.querySelector('input[name="otp0"]') as HTMLInputElement;
      otpI1.focus();
    }, 100);
  }

  onOtpInput(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (event.key === 'Backspace') {
      if (index > 0 && input.value === '') {
        const prevInput = document.querySelector(`input[name="otp${index - 1}"]`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          prevInput.select();
        }
      }
      return;
    }

    // Allow only numbers and limit to 1 character
    if (value.length > 1 || isNaN(Number(value))) {
      input.value = value.slice(0, 1);
    }

    const ignoredKeys = ['Tab', 'ArrowLeft', 'ArrowRight', 'Shift', 'Control', 'Alt', 'Delete'];
    if (ignoredKeys.includes(event.key)) {
      return;
    }

    if (value.length === 1 && index < 3) {
      const nextInput = document.querySelector(`input[name="otp${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onVerifyOtp() {
    console.log("OTP verified successfully!");
  }
}
