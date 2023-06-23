import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private alert:AlertsService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  singIn(){
    this.auth.singIn(this.form.value.email, this.form.value.password);
  }

  singInWithGoogle(){
    this.auth.singInWithGoogle();
  }
}