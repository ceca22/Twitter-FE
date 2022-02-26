import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleSignUpUser } from '../models/GoogleSignUpUser';
import { Post } from '../models/post';
import { ResponsePost } from '../models/responsePost';
import { User } from '../models/User';
import { PostService } from './post.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  //current user
  userSubscription:Subscription;
  private userSubject$ = new BehaviorSubject<User>(new User());
  userObservable = this.userSubject$.asObservable();
  // current user posts
  userPostsSubscription:Subscription;
  private userPostsSubject$ : BehaviorSubject<ResponsePost[]> = new BehaviorSubject<ResponsePost[]>([]);
  userPostsObservable = this.userPostsSubject$.asObservable();
  //all posts
  usersPostsSubscription:Subscription;
  private usersPostsSubject$ = new BehaviorSubject<ResponsePost[]>([]);
  usersPostsObservable = this.usersPostsSubject$.asObservable();
  baseUrl:string = environment.baseUrl;

  constructor(private authService: SocialAuthService, 
    private userService:UserService,
    private postService:PostService) { 
      
  }


  initCurrentUserSubscriptions(){
    this.userSubscription = this.authService.authState
    .subscribe(user => {
      this.userService.getCurrentUser(user.id);
      this.userSubscription = this.userService.userSubject$.subscribe(
        (payload) => {
          this.userSubject$.next(payload);
          
        })
    })
  }

  

  initCurrentUserPostsSubscriptions(){
    this.userPostsSubscription = this.postService.currentUserPostsSubject$
      .subscribe(payload => {
        console.log("current user posts" + payload);
        this.userPostsSubject$.next(payload);
        
      }
    )
  }
  
  initAllPostsSubscriptions(){
    this.usersPostsSubscription = this.postService.allPostsSubject$
    .subscribe(
      (payload:ResponsePost[]) => {
        console.log("all posts" + payload);
        this.usersPostsSubject$.next(payload);

        
      }
    )
  }

   


}

  
  
  



