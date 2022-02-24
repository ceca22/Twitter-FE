import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleSignUpUser } from '../models/GoogleSignUpUser';
import { User } from '../models/User';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = environment.baseUrl;
  userSubject$ = new Subject<User>();


  constructor(private authService:SocialAuthService,
     private router:Router, 
     private http:HttpClient,
     private postService:PostService) { }



  signIn(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut()
    .then((data) => {
      this.router.navigate(['']);
    }).catch((error) => {
      console.error(error);
    });
  }

  
  getCurrentUser(id:string){
    this.http
    .get<User>(`${this.baseUrl}/user/external/${id}`)
    .subscribe(
      (payload:any) => {
            this.userSubject$.next(payload);
            this.postService.getCurrentUserPosts(payload.id);
            console.log("username" + payload.username);
            console.log("id" + payload.id);
            console.log("external id" + payload.externalId);
            
          }, (error) => 
          { console.log(error);
        }
    )
  }

  convertToGoogleSignUpUser(user:SocialUser):GoogleSignUpUser{
    const googleSignUpUser:GoogleSignUpUser = {
      externalId : user.id,
      firstName :  user.firstName,
      lastName :  user.lastName,
      email :  user.email,
      username : "",
      photoUrl:user.photoUrl
    };
    console.log("3.convert")
    return googleSignUpUser;
  }


  updateUsername(user:User, username:string){
    const updatedUser:User = {
      id : Number(user.id),
      externalId : user.externalId,
      firstName :  user.firstName,
      lastName :  user.lastName,
      email :  user.email,
      username : username,
      photoUrl : user.photoUrl
    };

    return updatedUser;
  }

  registerUserWithGoogleSignUp(
    externalId:string, 
    firstName:string,
    lastName:string,
    email:string,
    username:string,
    photoUrl:string){
    this.http
    .post(`${this.baseUrl}/register/google`, {externalId, firstName, lastName, email,
      username, photoUrl}, {responseType:'text'})
    .subscribe((response) => {
      console.log("4.register user: " + response);
    },
    (error) => {
      console.log(error);
    })
  }

  updateUser(user:User){
    this.http
    .put(`${environment.baseUrl}/user/${user.id}`,
     {id:user.id, externalId:user.externalId, firstName:user.firstName,
    lastName:user.lastName, username:user.username, email:user.email,
     photoUrl:user.photoUrl }, 
    {responseType: 'text' as 'json'})
    .subscribe(
      (response) => {
      console.log("update user" + response);
    }, (error) => {
      console.log(error);
    })
  }

  


}
