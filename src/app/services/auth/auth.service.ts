import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertsService } from '../alerts/alerts.service';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = this.auth.currentUser;

  constructor(
    private auth:AngularFireAuth,
    private router:Router,
    private alert:AlertsService
  ){}

  singIn(email:string, password:string){
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

  register(email:string, password:string){
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

  singOut(){
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
  
  sessionState(){
    this.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        // The user object has basic properties such as display name, email, etc.
        const displayName:string | null = user.displayName;
        const email:string | null = user.email;
        const photoURL:string | null = user.photoURL;
        const emailVerified:boolean = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;

        console.log(`logged user ${displayName}`);
      } else {
        console.log(`User logOut`);
      }
    })
  }
}