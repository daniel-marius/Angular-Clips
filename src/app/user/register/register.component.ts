import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  age: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password: FormControl = new FormControl('', [Validators.required]);
  phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  });

  alertMessage: string = 'Please wait!';
  showAlert: boolean = false;
  alertColor: string = 'blue';

  constructor() {}

  ngOnInit(): void {}

  register(): void {
    this.showAlert = true;
    this.alertMessage = 'Please wait!';
    this.alertColor = 'blue';
    console.log('Form Submitted!');
  }
}
