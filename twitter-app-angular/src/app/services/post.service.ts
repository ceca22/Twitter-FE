import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { ResponsePost } from '../models/responsePost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl:string = environment.baseUrl;
  currentUserPostsSubject$:Subject<ResponsePost[]> = new Subject();
  allPostsSubject$:Subject<ResponsePost[]> = new Subject();
  getAllPostsSubject$:Subject<ResponsePost[]> = new Subject();


  constructor(private http:HttpClient) 
  { }
 
  post(form:Post, id:string){
    const data:Post = {
      Text:form.Text,
      Image:form.Image
    }
    return this.http.post<Post>(`${this.baseUrl}/post/${id}`, data, {responseType: 'text' as 'json'})
    .subscribe((response) => {
      console.log("post created: " + response);
      this.getAllPosts(10,0);
    },
    (error) => {
      console.log(error);
    })
    
  }

  getCurrentUserPosts(id:string){
    this.http
    .get<ResponsePost[]>(`${this.baseUrl}/post/current-user-posts/${id}`)
    .subscribe(
      (payload:ResponsePost[]) => {
        
          this.currentUserPostsSubject$.next(payload);
          }, (error) => 
          { console.log(error);
        }
    )
  }

  getAllPosts(take:Number, skip:Number){
    this.http
    .get<ResponsePost[]>(`${this.baseUrl}/post/getall/${take}/${skip}`)
    .subscribe(
      (payload:any) => {
        
        if(payload !== null){
          console.log(this.allPostsSubject$);
          this.allPostsSubject$.next(payload);
        }
        
          }, (error) => 
          { console.log(error);
        }
    )
  }

  getAll(){
    this.http
    .get<ResponsePost[]>(`${this.baseUrl}/post`)
    .subscribe(
      (payload:any) => {
        console.log("4.all posts")
            this.allPostsSubject$.next(payload);
          }, (error) => 
          { console.log(error);
        }
    )
  }

  

}





