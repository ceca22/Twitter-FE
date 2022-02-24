import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  SocialAuthService, SocialUser } from 'angularx-social-login';
import {  Subscription } from 'rxjs';
import { GoogleSignUpUser } from '../models/GoogleSignUpUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userSubscription: Subscription;
  socialUser: SocialUser;
  googleSignUpUser:GoogleSignUpUser

  constructor( 
    private authService:SocialAuthService, 
    private userService:UserService,
     private router:Router) { }

  ngOnInit() {
    
  }


  public signInWithGoogle(): void {
    this.userService.signIn();
    this.initSubscriptionsCurrentUser();

    
  }

  initSubscriptionsCurrentUser(){
    this.userSubscription = this.authService.authState
    .subscribe(user => {
      this.socialUser = user;
      console.log(user);
      

      if(this.socialUser !== null)
      {
        this.googleSignUpUser = this.userService.convertToGoogleSignUpUser(this.socialUser);
        this.userService.registerUserWithGoogleSignUp
        (this.googleSignUpUser.externalId,
        this.googleSignUpUser.firstName,
        this.googleSignUpUser.lastName,
        this.googleSignUpUser.email,
        this.googleSignUpUser.username,
        this.googleSignUpUser.photoUrl)
        this.router.navigate(["home-page"]);
      }
    }
  )}
  
}
