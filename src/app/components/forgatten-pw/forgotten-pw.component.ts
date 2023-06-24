import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotten-pw',
  templateUrl: './forgotten-pw.component.html',
  styleUrls: ['./forgotten-pw.component.scss']
})
export class ForgottenPwComponent {
  form:FormGroup;

  constructor(
    private auth:AuthService,
    private fb:FormBuilder
  ){
    this.form = this.fb.group({
      email: ['', Validators.required]
    })
  }

  recover(){
    this.auth.forgottenPw(this.form.value.email);
  }
}
