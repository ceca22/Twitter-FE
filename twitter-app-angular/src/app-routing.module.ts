import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './app/sign-up/sign-up.component';

const routes: Routes = [
    {path:'', redirectTo:'sign-up' , pathMatch:'full'},
    {path:'sign-up', component:SignUpComponent},
    {path:'home-page', 
    loadChildren: () => import('./app/home-page/home-page.module').then(m => m.HomePageModule)}
    
];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {

}