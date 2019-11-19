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
import { UserRequestComponent } from './component/user-request/user-request.component';
import { GroupsComponent } from './component/groups/groups.component';
import { UsersComponent } from './component/users/users.component';
import { ClientsComponent } from './component/clients/clients.component';
import { ProjectTypeComponent } from './component/project-type/project-type.component';
import { TaskTypeComponent } from './component/task-type/task-type.component';
import { DocumentTypesComponent } from './component/document-types/document-types.component';
import { StatusTypesComponent } from './component/status-types/status-types.component';
import { ActivityContainerComponent } from './component/activity-container/activity-container.component';
import { DocumentContainerComponent } from './component/document-container/document-container.component';
import { AuthGuard } from './guards/auth.guard';
import { ROLES } from './helpers/constants';
import { UserContainerComponent } from './component/user-container/user-container.component';

export const routes: Routes = [
  {
    path: '',  component: GuestlayoutComponent, children: [
      { path: 'login',  component: AuthenticationComponent },
      { path: 'signup',  component: SignupComponent },
      {path: 'reset', component: ResetuserpasswordComponent}
    ]
  },
  {
    path: 'project', component: DefaultlayoutComponent, children: [
      { path: '', component: ProjectComponent, data: { animation: 'isRight' } },
      // { path: 'activities', component: ActivityComponent },
    ]
  },
  {
    path: 'activity', component: DefaultlayoutComponent, children: [
      { path: '', component: ActivityComponent, data: { animation: 'isRight' } },
      { path: 'documents', component: ActivityContainerComponent },
    ]
  },
  // { path: 'documents/activity', data: { animation: 'isRight' }, component: ActivityComponent },
  {
    path: 'documents', component: DefaultlayoutComponent, children: [
      { path: '', data: { animation: 'isRight' }, component: DocumentContainerComponent },
    ]
  },  {
    path: 'client', component: DefaultlayoutComponent, children: [
      { path: '', component: ClientsComponent, data: { animation: 'isRight' } },
  
    ]
  },

  {
    path: 'settings',
     component: DefaultlayoutComponent,
    //  canActivate:[AuthGuard],
    //  data:{
    //    allowedRoles:[
    //      "ADMIN",
    //      "Notification",
    //      "TRUST"
    //    ]
    //  },
     children: [
      { path: '',  data: { animation: 'isRight' }, component: SettingsComponent },
      { path: 'server', component: ServerDetailsComponent },
      {path: 'project/types', component: ProjectTypeComponent, data: {animation: 'isRight'}},
      {path: 'task/types', component: TaskTypeComponent, data: {animation: 'isRight'}},
      {path: 'document/types', component: DocumentTypesComponent, data: {animation: 'isRight'}},
      {path: 'project/types', component: ProjectTypeComponent, data: {animation: 'isRight'}},
      {path: 'status/types', component: StatusTypesComponent, data: {animation: 'isRight'}}
    ]
  },
  {
    path: 'dashboard', component: DefaultlayoutComponent, children: [
      { path: '', component: DashboardComponent }
    ]
  },

  {
    path: 'user/management', component: DefaultlayoutComponent, children: [
      {
<<<<<<< HEAD
        path:'', component: UserContainerComponent, data: {animation: 'isRight'},
      }
    ] 
  },

=======
        path: '', component: UserContainerComponent, data: {animation: 'isRight'}
      }
    ]
  },
>>>>>>> 7495177205ff76cfd30861cf6557182a0a09f06e
  // {
  //   path: 'user', component: DefaultlayoutComponent, children: [
  //     {path: '', component: UsersComponent, data: {animation: 'isRight'}},
  //     { path: 'request', component: UserRequestComponent },
  //     { path: 'group', component: GroupsComponent },
  //   ]
  // },
  {
    path: 'report', component: DefaultlayoutComponent, children: [
      { path: '', component: RecordsComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];



export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
