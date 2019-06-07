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
import { ProjectTableComponent } from './component/project-table/project-table.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { BottomSheetComponent } from './component/bottom-sheet/bottom-sheet.component'
import { NgReduxModule,NgRedux} from "@angular-redux/store"

import rootReducer from './reducer';
import { IAppState, store } from './store';
rootReducer
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

  ],
  imports: [
    BrowserModule,
    rootRouting,
    routing,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ScrollingModule,
    NgReduxModule,
  ],
  entryComponents:[BottomSheetComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
      ngRedux.provideStore(store);
    }
}
