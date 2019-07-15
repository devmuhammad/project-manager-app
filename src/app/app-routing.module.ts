import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestlayoutComponent } from './layout/guestlayout/guestlayout.component';
import { AuthenticationComponent } from './component/auth/authentication/authentication.component';
import { ProjectComponent } from './component/project/project.component';
import { DefaultlayoutComponent } from './layout/defaultlayout/defaultlayout.component';
import { SettingsComponent } from './component/settings/settings.component';
import { RecordsComponent } from './component/records/records.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ActivityComponent } from './component/activity/activity.component';
import { ServerDetailsComponent } from './component/server-details/server-details.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { ResetuserpasswordComponent } from './component/auth/resetuserpassword/resetuserpassword.component';

export const routes: Routes = [
  {
    path: '',  component: GuestlayoutComponent, children: [
      { path: 'login', data: { animation: 'isRight' }, component: AuthenticationComponent },
      { path: 'signup',  component: SignupComponent },
      {path: 'reset', component: ResetuserpasswordComponent}
    ]
  },
  {
    path: 'project', component: DefaultlayoutComponent, children: [
      { path: '', component: ProjectComponent },
      { path: 'activities', component: ActivityComponent },
    ]
  },

  {
    path: 'settings', component: DefaultlayoutComponent, children: [
      { path: '', component: SettingsComponent, data: { animation: 'isRight' } },
      { path: 'server', component: ServerDetailsComponent },
    ]
  },
  {
    path: 'dashboard', component: DefaultlayoutComponent, children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: 'report', component: DefaultlayoutComponent, children: [
      { path: '', component: RecordsComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];



export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
