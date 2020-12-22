import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  loading: boolean;
  ngOnInit(): void {
    this.subscription = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  signIn() {
    this.authService.login(this.signInForm.value);
  }
}
