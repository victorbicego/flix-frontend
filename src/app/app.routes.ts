import { Routes } from '@angular/router';
import { HomeComponent } from './pages/general/home/home.component';
import { InfoComponent } from './pages/general/info/info.component';
import { ChannelComponent } from './pages/general/channel/channel.component';
import { VideoComponent } from './pages/general/video/video.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { CoreHomeComponent } from './pages/admin/core-home/core-home.component';
import { CoreAuthGuardService } from './services/admin/core-auth-guard/core-auth-guard.service';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'channel/:id', component: ChannelComponent },
  { path: 'video/:id', component: VideoComponent },
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin/home',
    component: CoreHomeComponent,
    canActivate: [CoreAuthGuardService],
  },
  { path: '**', component: HomeComponent },
];
