import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import IUser from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  alertColor: string = 'blue';
  alertMessage: string = 'Please wait! We are logging';
  showAlert: boolean = false;
  inSubmission: boolean = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login(): Promise<void> {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! We are logging...';
    this.inSubmission = true;
    try {
      const { email, password }: Partial<IUser> = this.loginForm.value;
      await this.auth.signInWithEmailAndPassword(
        email as string,
        password as string
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMessage = 'An error occured!';
      this.alertColor = 'red';
      return;
    }

    this.alertMessage = 'Success! You are now logged in!';
    this.alertColor = 'green';
  }
}
