import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule  } from "@angular/router";
import { HomePageComponent } from "./home-page.component";
import { PostTemplateComponent } from "./post-template/post-template.component";
import { WhoToFollowTemplateComponent } from "./who-to-follow-template/who-to-follow-template.component";
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
    declarations: [
        HomePageComponent,
        PostTemplateComponent,
        WhoToFollowTemplateComponent
    ],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        // ScrollingModule,
        RouterModule.forChild([
            {path:'', component:HomePageComponent}
        ]),
    ]
})

export class HomePageModule { }

