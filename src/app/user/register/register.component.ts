import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';

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
  age: FormControl<number | null> = new FormControl(null, [
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
  alertColor: string = 'blue';
  showAlert: boolean = false;
  inSubmission: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  async register() {
    this.showAlert = true;
    this.inSubmission = true;
    this.alertMessage = 'Please wait!';
    this.alertColor = 'blue';

    try {
      await this.auth.createUser(this.registerForm.value as IUser);
    } catch (error) {
      console.error(error);
      this.alertMessage = 'An unexpected error occured!';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMessage = 'Success! Your account has been created!';
    this.alertColor = 'green';
  }
}
