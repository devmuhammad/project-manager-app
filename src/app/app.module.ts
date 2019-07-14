import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule,ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { DefaultlayoutComponent } from './layout/defaultlayout/defaultlayout.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MaterialModule} from './material/material.module';
import { GuestlayoutComponent } from './layout/guestlayout/guestlayout.component';
import { AuthenticationComponent } from './component/auth/authentication/authentication.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProjectComponent } from './component/project/project.component';
import { RecordsComponent } from './component/records/records.component';
import { SettingsComponent } from './component/settings/settings.component';
import { RouterModule } from '@angular/router';
import { routing } from './app-routing.module';
import { AngularButtonLoaderModule } from 'angular-button-loader';
import { ProjectTableComponent } from './component/project-table/project-table.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { BottomSheetComponent } from './component/bottom-sheet/bottom-sheet.component'
import { NgReduxModule,NgRedux} from '@angular-redux/store';
import {ReactiveFormsModule} from '@angular/forms';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import rootReducer from './reducer';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { IAppState, store } from './store';
import { CreateProjectModalComponent } from './component/create-project-modal/create-project-modal.component';
import { ProjectService } from './services/project.service';
import { ActivityComponent } from './component/activity/activity.component';
import { ActivityDetailComponent } from './component/activity-detail/activity-detail.component';
import { ServerDetailsComponent } from './component/server-details/server-details.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { ResetuserpasswordComponent } from './component/resetuserpassword/resetuserpassword.component';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });
@NgModule({
  declarations: [
    AppComponent,
    DefaultlayoutComponent,
    GuestlayoutComponent,
    AuthenticationComponent,
    DashboardComponent,
    ProjectComponent,
    RecordsComponent,
    SettingsComponent,
    ProjectTableComponent,
    BottomSheetComponent,
    CreateProjectModalComponent,
    ActivityComponent,
    ActivityDetailComponent,
    ServerDetailsComponent,
    SignupComponent,
    ResetuserpasswordComponent,

  ],
  imports: [
    BrowserModule,
    rootRouting,
    routing,
    AngularButtonLoaderModule.forRoot(),
    LoadingBarModule,
    // LoadingBarHttpClientModule,
    // LoadingBarHttpModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ScrollingModule,
    NgReduxModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents:[
    BottomSheetComponent,
    CreateProjectModalComponent,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
      ngRedux.provideStore(store);
    }
}
