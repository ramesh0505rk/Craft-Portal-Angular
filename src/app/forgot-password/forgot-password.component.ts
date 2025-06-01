import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from '../Services/otp.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements DoCheck {

  emailFormGroup: FormGroup
  otpFormGroup: FormGroup
  otpError: string | null = null;
  isGetOtpLoading: boolean = false;
  isVerifyOtpLoading: boolean = false;

  allowEnterOtp: boolean = false;
  disableEmailAndOtpBtn: boolean = false;

  email: string = '';

  constructor(private router: Router, private otpService: OtpService) {
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

  ngDoCheck(): void {
    if (this.emailFormGroup.invalid) {
      this.otpError = null
    }
  }

  onGetOtp() {
    this.isGetOtpLoading = true;
    if (this.emailFormGroup.invalid) {
      Object.keys(this.emailFormGroup.controls).forEach(key => {
        const control = this.emailFormGroup.get(key);
        if (control) {
          control.markAsTouched();
        }
      })
      return
    }

    this.disableEmailAndOtpBtn = true;
    this.emailFormGroup.get('email')?.disable();
    this.email = this.emailFormGroup.get('email')?.value;
    this.otpService.requestOtp(this.email).subscribe({
      next: (res: any) => {
        this.allowEnterOtp = true;
        this.isGetOtpLoading = false;
        setTimeout(() => {
          const otpI1 = document.querySelector('input[name="otp0"]') as HTMLInputElement;
          otpI1.focus();
        }, 100);
      },
      error: (err: any) => {
        this.isGetOtpLoading = false;
        this.disableEmailAndOtpBtn = false;
        this.emailFormGroup.get('email')?.enable();
        console.log(err?.error.message)
        this.otpError = err?.error.message || 'Failed to send OTP. Please try again.';
      }
    });

    console.log("OTP sent to:", this.email);
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
    if (this.otpFormGroup.invalid) {
      Object.keys(this.otpFormGroup.controls).forEach(key => {
        const control = this.otpFormGroup.get(key);
        if (control) {
          control.markAsTouched();
        }
      })
      return;
    }

    var otp = ''
    for (let i = 0; i < 4; i++) {
      const input = this.otpFormGroup.get(`otp${i}`)?.value;
      if (input)
        otp += input;
    }
    console.log("OTP entered:", otp);
  }

  onPasteOtp(event: ClipboardEvent) {
    event.preventDefault();

    const pastedData = event.clipboardData?.getData('text') || '';
    const otpDigits = pastedData?.trim().slice(0, 4).split('')

    otpDigits.forEach((digit, index) => {
      if (this.otpFormGroup.get(`otp${index}`)) {
        this.otpFormGroup.get(`otp${index}`)?.setValue(digit)
      }
    })

    const lastIndex = otpDigits.length - 1;
    const lastInput=document.querySelector(`input[name="otp${lastIndex}"]`) as HTMLInputElement;
    lastInput?.focus();
  }

  onBackToSignin() {
    this.router.navigate(['/signin']);
  }
}
