import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FeedComponent } from './components/feed/feed.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { SearchComponent } from './components/search/search.component';

import { ImageComponent } from './components/image/image.component';
// import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ErrorComponent } from './components/error/error.component';

import { IdentityGuard } from './services/identity.guard';
import { Identity2Guard } from './services/identity2.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'home/:page', component: HomeComponent},
    {path: 'feed', component: FeedComponent, canActivate: [IdentityGuard]},
    // {path: 'discover', component: DiscoverComponent}, // Since it's not implemented (and it may never be...), we disable it so user can't access from route
    {path: 'search', component: SearchComponent},
    {path: 'search/:page', component: SearchComponent},
    {path: 'upload-image', component: UploadImageComponent, canActivate: [IdentityGuard]},
    {path: 'images/:image', component: ImageComponent},
    // {path: 'login', component: LoginComponent, canActivate: [Identity2Guard]},
    {path: 'logout/:sure', component: LogoutComponent, canActivate: [IdentityGuard]},
    // {path: 'register', component: RegisterComponent, canActivate: [Identity2Guard]},

    {path: 'profile/:username/:page', component: ProfileComponent},
    {path: 'profile/:username', component: ProfileComponent},
    {path: 'edit', component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [IdentityGuard]},
    {path: 'error', component: ErrorComponent},
    {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);