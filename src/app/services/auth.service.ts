import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, delay, filter, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<
    IUser
  > = this.db.collection<IUser>('users');
  public isAuthenticated$: Observable<boolean> = this.auth.user.pipe(
    map((user) => !!user)
  );
  public isAuthenticatedWithDelay$: Observable<
    boolean
  > = this.isAuthenticated$.pipe(delay(1000));
  private redirect: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params
      .pipe(
        filter((event: Params) => event instanceof NavigationEnd),
        map((event: Params) => this.route.firstChild),
        switchMap((route: ActivatedRoute | null) => route?.data ?? of({})),
        tap((data) => {
          this.redirect = data['authOnly'] ?? false;
        })
      )
      .subscribe();
  }

  public async createUser(userData: IUser): Promise<void> {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if (!userCred.user) {
      throw new Error("User can't be found!");
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event): Promise<void> {
    if ($event) {
      $event.preventDefault();
    }
    await this.auth.signOut();

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
