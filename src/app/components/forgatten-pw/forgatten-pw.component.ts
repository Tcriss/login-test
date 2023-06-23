import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgatten-pw',
  templateUrl: './forgatten-pw.component.html',
  styleUrls: ['./forgatten-pw.component.scss']
})
export class ForgattenPwComponent {

  constructor(private auth:AuthService){}
}
