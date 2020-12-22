import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  loading: boolean;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));
    this.formSignUp();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  formSignUp() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  signUp() {
    this.authService.register(this.signUpForm.value);
  }
}
