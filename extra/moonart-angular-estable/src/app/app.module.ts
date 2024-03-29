import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ImageComponent } from './components/image/image.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImagesComponent } from './components/profile/userImages.component';
import { LikesComponent } from './components/profile/likes.component';
import { FavsComponent } from './components/profile/favs.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ErrorComponent } from './components/error/error.component';

import { IdentityGuard} from './services/identity.guard';
import { Identity2Guard} from './services/identity2.guard';
import { UserService } from './services/user.service';
import { ImageService } from './services/image.service';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent, outlet: 'home' },
  { path: '', component: FeedComponent, outlet: 'feed' },
  { path: '', component: DiscoverComponent, outlet: 'discover' },
  { path: '', component: UploadImageComponent, outlet: "upload" },
  { path: '', component: LoginComponent, outlet: 'login' },
  { path: '', component: RegisterComponent, outlet: 'register' },
  { path: '', component: ProfileComponent, outlet: 'profile' },
  { path: '', component: UserEditComponent, outlet: 'edit' },
  { path: '', component: SettingsComponent, outlet: 'settings' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    DiscoverComponent,
    UploadImageComponent,
    ImageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ImagesComponent,
    LikesComponent,
    FavsComponent,
    UserEditComponent,
    SettingsComponent,
    ErrorComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    Identity2Guard,
    UserService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
