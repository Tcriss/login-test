import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertsService } from '../alerts/alerts.service';
import { GoogleAuthProvider } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private auth:AngularFireAuth,
    private router:Router,
    private alert:AlertsService
  ){
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        // not logged in
        this.loggedIn.next(false);
      } 
    });
  }

  public isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  singIn(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password).then(
      (user)=>{
        this.alert.notify('Welcome','Welcome User','success');
        this.router.navigate(['/home']);
      }).catch(error =>{
        let errorCode = error.code;
        let errorMessage = error.message;
        this.alert.notify(`Something went wrong ${errorCode}`,errorMessage,'error');
      });
  }

  register(email: string, password: string){
    this.auth.createUserWithEmailAndPassword(email, password).then(
      (user)=>{
        this.alert.notify('Welcome','You have just registered succesfully','success');
        this.router.navigate(['/home']);
      }).catch(error =>{
        let errorCode = error.code;
        let errorMessage = error.message;
        this.alert.notify(`Something went wrong ${errorCode}`,errorMessage,'error');
      });
  }

  singInWithGoogle(){
    this.auth.signInWithPopup(new GoogleAuthProvider()).then(
      (user) => {
        this.alert.notify('Hello!','Singin succesful','success');
        this.router.navigate(['/home']);
        console.log(user);
      }).catch(error =>{
        let errorCode = error.code;
        let errorMessage = error.message;
        this.alert.notify(`Something went wrong ${errorCode}`,errorMessage,'error');
      });
  }

  logOut(){
    this.auth.signOut().then(
      user => {
        this.alert.notify('Goodbye','I hope we see you soon','success');
        this.router.navigate(['/login']);
      }).catch(error =>{
        let errorCode = error.code;
        let errorMessage = error.message;
        this.alert.notify(`Something went wrong ${errorCode}`,errorMessage,'error');
      });
  }

  forgottenPw(email: string){
    this.auth.sendPasswordResetEmail(email)
    .then(() => {
      this.alert.notify('Password Reset','An email was sent to you your mail inbos to recover your account','info');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.alert.notify(`Something went wrong ${errorCode}`,errorMessage,'error');
    });
  }

  verifyEmail(){}
}