
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ResponsePost } from 'src/app/models/responsePost';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.css'],
})
export class PostTemplateComponent implements OnInit{

  constructor() {
   }

  @Input() post:ResponsePost;
  @Input() user:User;
  todayDate = new Date();
  postDate:Date;
  time:Number;
  timeOfPost:string | null;

  ngOnInit() {
    this.postDate = new Date(this.post.datePosted)
    console.log(this.post.datePosted);
    this.timeOfPost = this.getTime(this.postDate)
	}

  getTime(date:Date){
    if(this.post != null){
      if(this.postDate.getFullYear() === this.todayDate.getFullYear()){
        if(this.postDate.getMonth()===this.todayDate.getMonth()){
          if(this.postDate.getDate()===this.todayDate.getDate()){
            if(this.postDate.getHours()===this.todayDate.getHours()){
              if(this.postDate.getMinutes()===this.todayDate.getMinutes()){
                        this.time = this.todayDate.getSeconds() - this.postDate.getSeconds()
                        return this.timeOfPost = this.time + "s"
              } else {
                if(this.todayDate.getMinutes() > this.postDate.getMinutes() ){
                  this.time = this.todayDate.getMinutes() + (60 - this.postDate.getSeconds())
                  return this.timeOfPost = this.time + "m"
                } else {
                  this.time = (60 - this.postDate.getMinutes()) + this.todayDate.getMinutes()  
                  return this.timeOfPost = this.time + "m"
                }
              }
            } 
              this.time = this.todayDate.getHours() - this.postDate.getHours()
              if(this.time === 1){
                if(this.todayDate.getMinutes() > this.postDate.getMinutes() ){
                  this.time = this.todayDate.getMinutes() + (60 - this.postDate.getMinutes())
                  if(this.time > 59){
                    return this.timeOfPost = 1 + "h"
                  }
                  return this.timeOfPost = this.time + "m"
                } else {
                  this.time = (60 - this.postDate.getMinutes()) + this.todayDate.getMinutes()  
                  if(this.time > 59){
                    return this.timeOfPost = 1 + "h"
                  }
                  return this.timeOfPost = this.time + "m"
                }
              }
              return this.timeOfPost = this.time + "h"
          }
          if(this.postDate.getDate()!==this.todayDate.getDate()){
            if(this.postDate.getDate() - this.todayDate.getDate() === 1){
              this.time = this.todayDate.getHours() - this.postDate.getHours()
              if(this.time > 23){
                return this.timeOfPost = 1 + "d"
                
              }
              return this.timeOfPost = this.time + "h"

            }
            
              return this.timeOfPost = this.postDate.toLocaleString('en-us', { month: 'short' }) 
              + ", " + this.postDate.getDate()
            
            
          }

        }
        return this.timeOfPost = this.postDate.toLocaleString('en-us', { month: 'short' }) 
              + ", " + this.postDate.getDate()
      }
      return this.timeOfPost = this.postDate.toLocaleString('en-us', { month: 'short' }) 
              + ", " + this.postDate.getDate()
    }
    return null;
  }

}
