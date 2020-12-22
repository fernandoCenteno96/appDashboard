import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUserAction } from './auth.actions';
import {
  ActiveLoadingAction,
  InactiveLoadingAction,
} from '../shared/ui.accions';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubscription: Subscription;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private AfDB: AngularFirestore,
    private store: Store<AppState>
  ) {}
  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser) => {
      if (fbUser) {
        this.userSubscription = this.AfDB.doc(`${fbUser.uid}/users`)
          .valueChanges()
          .subscribe((userObj: any) => {
            const newUser = new UserModel(userObj);
            this.store.dispatch(new setUserAction(newUser));
          });
      } else {
        this.userSubscription.unsubscribe();
      }
    });
  }
  register(user: UserModel) {
    this.store.dispatch(new ActiveLoadingAction());
    this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((resp) => {
        const userFb: UserModel = {
          uid: resp.user.uid,
          name: user.name,
          email: resp.user.email,
        };
        this.AfDB.doc(`${userFb.uid}/users`)
          .set(userFb)
          .then(() => {
            this.store.dispatch(new InactiveLoadingAction());
            this.router.navigateByUrl('dashboard');
          });
      })
      .catch((error) => {
        this.store.dispatch(new InactiveLoadingAction());
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      });
  }
  login(user: UserModel) {
    this.store.dispatch(new ActiveLoadingAction());
    this.afAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((resp) => {
        this.router.navigateByUrl('dashboard');

        this.store.dispatch(new InactiveLoadingAction());
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
        this.store.dispatch(new InactiveLoadingAction());
      });
  }
  logout() {
    this.router.navigate(['/sign-in']);
    this.afAuth.signOut();
  }
  isAuth() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        if (fbUser == null) this.router.navigateByUrl('/sign-in');
        return fbUser != null;
      })
    );
  }
}
