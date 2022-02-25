import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, subscribeOn, Subscription } from 'rxjs';
import { Post } from '../models/post';
import { ResponsePost } from '../models/responsePost';
import { User } from '../models/User';
import { PostService } from '../services/post.service';
import { SharedDataService } from '../services/shared-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  
  user:User;
  userSubscription:Subscription;
  everyoneCanReply:boolean;
  username:string;
  // current user posts
  userPosts:ResponsePost[]=[];
  postForm:FormGroup;
  userPostSubscription:Subscription;
  // all users posts
  allPosts:ResponsePost[]=[];
  allPostsSubscription:Subscription;
  //
  @ViewChild('fileImageInput')
  fileImageInputVar: any;
  url: any = ""; 
	msg = "";
  @ViewChild('spanElement')
  spanElement: ElementRef;
  spanText:string;
  showTwitterAccountOptions:boolean;
  showLogOutMenu:boolean;
  //image upload
  public selectedFile:any;
  enable:boolean = false;
  take:Number = 10;
  
  constructor(private userService:UserService,
    private sharedData:SharedDataService, 
    private postService:PostService) {
  
    }

  ngOnInit(): void {
    //
    window.scrollTo(0,0);
    this.sharedData.initCurrentUserSubscriptions();
    this.sharedData.userObservable.subscribe(message => this.user = message);
    //posts
    this.postService.getAllPosts(this.take, this.allPosts.length);  
    this.sharedData.initAllPostsSubscriptions();
    // this.sharedData.userPostsObservable.subscribe(posts => this.userPosts = posts)
    this.sharedData.usersPostsObservable.subscribe(posts => 
      posts.map(x => this.allPosts.push(x)));
      console.log(" " + window.innerHeight + " " + window.scrollY + " " + document.body.offsetHeight)
      console.log("vo ng oninit" + this.take, this.allPosts.length)
    this.sharedData.initCurrentUserSubscriptions();
    
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("i am at the bottom");
      console.log("take: " + this.take + " allposts.length " + this.allPosts.length)
      this.postService.getAllPosts(this.take, this.allPosts.length);
    }
  }

  public signOut(): void {
    this.userService.signOut();
  }

  onClickEveryoneCanReply(){
    this.everyoneCanReply = true;
    console.log(this.everyoneCanReply);
  }

  enableButton(){
    const span = this.spanElement.nativeElement;
    var counterCharacterData:Number = 0;
    const config = { attributes: true, childList: true, subtree: true, characterData: true, 
      characterDataOldValue: true };
    
    // Callback function to execute when mutations are observed
    var callback = function(mutationsList:any, observer:any) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
          if (mutation.type === 'characterData'){
            console.log('A character is modified.');
            console.log(observer)
          } else
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
                
    }}
    
  };
  
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(span, config);
    return this.enable = true;
  }

  // enableTweet(){
  //   if(this.spanElement.nativeElement.innerText.length > 0){
  //     return this.enable = true;
  //   }
  //   return this.enable = false;

  // }


  onSubmitStatus(){
    this.spanText = this.spanElement.nativeElement.innerText;
    console.log(this.spanText);
    this.postForm = new FormGroup({
      Text : new FormControl(this.spanText), 
      Image:new FormControl(this.url),
    });
  
    const data:Post = this.postForm.value;
    this.postService.post(data, this.user.externalId)
    this.spanElement.nativeElement.innerText = "";
    this.url="";
		this.fileImageInputVar.nativeElement.value='';
  }


  updateUsername(){
    console.log(this.username);
    this.user = this.userService.updateUsername(this.user, this.username);
    console.log(this.user.username + "external: " + this.user.externalId + "id: " + this.user.id);
    this.userService.updateUser(this.user);
  }
  
	selectFile(event: any) { 
    this.selectedFile = event.target.files[0];
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
      console.log(event);
		}
	}

  removeImageInput(){
    console.log(this.fileImageInputVar);
    this.url="";
		this.fileImageInputVar.nativeElement.value='';
  }

  showTwitterAccountOptionsButton(){
    this.showTwitterAccountOptions = !this.showTwitterAccountOptions;
    console.log("show twitter account: " + this.showTwitterAccountOptions)
  }

  showLogOutMenuButton(){
    this.showLogOutMenu = !this.showLogOutMenu;
  }

  ngOnDestroy(){
    this.allPostsSubscription.unsubscribe();
  }
}




