import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  emailFormGroup: FormGroup
  otpFormGroup: FormGroup
  otpError: string | null = null;

  allowEnterOtp: boolean = false;
  disableEmailAndOtpBtn: boolean = false;

  email: string = '';

  constructor(private router: Router) {
    this.emailFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.otpFormGroup = new FormGroup({
      otp0: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
      otp1: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
      otp2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
      otp3: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')])
    });
  }

  onGetOtp() {
    if (this.emailFormGroup.invalid) {
      Object.keys(this.emailFormGroup.controls).forEach(key => {
        const control = this.emailFormGroup.get(key);
        if (control) {
          control.markAsTouched(); // Mark the control as touched to trigger validation messages
        }
      })
      return
    }

    this.allowEnterOtp = true;
    this.disableEmailAndOtpBtn = true;
    this.emailFormGroup.get('email')?.disable();


    this.email = this.emailFormGroup.get('email')?.value;
    console.log("OTP sent to:", this.email);


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
    // console.log("OTP verified successfully!");
    var otp = ''
    for (let i = 0; i < 4; i++) {
      const input = this.otpFormGroup.get(`otp${i}`)?.value;
      if (input) {
        otp += input;
      } else {
        console.error(`OTP input ${i} is empty`);
        this.otpError = 'Please enter all digits of the OTP.';
        return;
      }
    }

    console.log("OTP entered:", otp);
  }

  onBackToSignin() {
    this.router.navigate(['/signin']);
  }
}
