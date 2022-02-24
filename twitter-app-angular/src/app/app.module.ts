import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SocialLoginModule,SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { environment } from 'src/environments/environment';

const CLIENT_ID = environment.client_Id;


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent, 
    
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    SocialLoginModule, 
    HttpClientModule,
    ReactiveFormsModule, 
    AppRoutingModule,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
