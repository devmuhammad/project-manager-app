import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule,ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { DefaultlayoutComponent } from './layout/defaultlayout/defaultlayout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule} from './material/material.module';
import { GuestlayoutComponent } from './layout/guestlayout/guestlayout.component';
import { AuthenticationComponent } from './component/auth/authentication/authentication.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProjectComponent } from './component/project/project.component';
import { RecordsComponent } from './component/records/records.component';
import { ReasonsComponent } from './component/reasons/reasons.component';
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
import { ResetuserpasswordComponent } from './component/auth/resetuserpassword/resetuserpassword.component';
import { UserRequestComponent } from './component/user-request/user-request.component';
import { RequestTableComponent } from './component/request-table/request-table.component';
import { GroupsComponent } from './component/groups/groups.component';
import { UsersComponent } from './component/users/users.component';
import { NewUserModalComponent } from './component/new-user-modal/new-user-modal.component';
import { ApprovalModalComponent } from './component/approval-modal/approval-modal.component';
import { UpdateGroupModalComponent } from './component/update-group-modal/update-group-modal.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { UpdateUserModalComponent } from './component/update-user-modal/update-user-modal.component';
import { ClientsComponent } from './component/clients/clients.component';
import { CreateClientComponent } from './component/modals/create-client/create-client.component';
import { UpdateClientComponent } from './component/modals/update-client/update-client.component';
import { ServerCredentialsComponent } from './component/modals/server-credentials/server-credentials.component';
import { ClientsTableComponent } from './component/clients-table/clients-table.component';
import { NewGroupModalComponent } from './component/modals/new-group-modal/new-group-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateProjectTypeModalComponent } from './component/modals/create-project-type-modal/create-project-type-modal.component';
import { UpdateProjectTypeModalComponent } from './component/modals/update-project-type-modal/update-project-type-modal.component';
import { UpdateStatusModalComponent } from './component/modals/update-status-modal/update-status-modal.component';
import { UpdateReasonComponent } from './component/modals/update-reason/update-reason.component';
import { CreateStatusModalComponent } from './component/modals/create-status-modal/create-status-modal.component';
import { CreateReasonComponent } from './component/modals/create-reason/create-reason.component';
import { CreateTaskTypeModalComponent } from './component/modals/create-task-type-modal/create-task-type-modal.component';
import { UpdateTaskTypeModalComponent } from './component/modals/update-task-type-modal/update-task-type-modal.component';
import { UpdateDoctypeModalComponent } from './component/modals/update-doctype-modal/update-doctype-modal.component';
import { AddDocTypeModalComponent } from './component/modals/add-doc-type-modal/add-doc-type-modal.component';
import { UpdateProjectModalComponent } from './component/modals/update-project-modal/update-project-modal.component';
import { CreateDocTypeModalComponent } from './component/modals/create-doc-type-modal/create-doc-type-modal.component';
import { ProjectTypeComponent } from './component/project-type/project-type.component';
import { TaskTypeComponent } from './component/task-type/task-type.component';
import { DocumentTypesComponent } from './component/document-types/document-types.component';
import { StatusTypesComponent } from './component/status-types/status-types.component';
import { BreadcrumblayoutComponent } from './layout/breadcrumblayout/breadcrumblayout.component';
import { NotificationsComponent } from './component/modals/notifications/notifications.component';
import { RepositoryComponent } from './component/modals/repository/repository.component';
import { ActivityContainerComponent } from './component/activity-container/activity-container.component';
import { DocumentContainerComponent } from './component/document-container/document-container.component';
import { DragDropDirective } from './component/drag-drop.directive';
import { ConversationComponent } from './component/conversation/conversation.component';
import { DocumentUpdateComponent } from './component/document-update/document-update.component';
import { TaskContainerComponent } from './component/task-container/task-container.component';
import { AuthGuard } from './guards/auth.guard';
import { UserContainerComponent } from './component/user-container/user-container.component';
import { MatInputModule } from '@angular/material';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { SettingsContainerComponent } from './component/settings-container/settings-container.component';
import { ReassignProjectComponent } from './component/modals/reassign-project/reassign-project.component';
import { ProjectTimelineComponent } from './component/modals/project-timeline/project-timeline.component';
import { AddActivityComponent } from './component/modals/add-activity/add-activity.component';
import { ServerAccountComponent } from './component/server-details/server-account/server-account.component';
import { ToolsComponent } from './component/server-details/tools/tools.component';
import { AddServerAccountComponent } from './component/modals/add-server-account/add-server-account.component';
import { AddServerCredentialComponent } from './component/modals/add-server-credentials/add-server-credential.component';
import { AddServerToolComponent } from './component/modals/add-server-tools/add-server-tool.component';
import { ExtendDuedateComponent } from './component/modals/extend-duedate/extend-duedate.component';
import { DocumentPreviewComponent } from './component/modals/document-preview/document-preview.component';
import { ImageViewerModule } from 'ng2-image-viewer';
// import { persistStore } from 'redux-persist';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });
// const persistor = persistStore(store);
@NgModule({
  declarations: [
    AppComponent,
    DefaultlayoutComponent,
    GuestlayoutComponent,
    AuthenticationComponent,
    DashboardComponent,
    ProjectComponent,
    ReasonsComponent,
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
    UserRequestComponent,
    RequestTableComponent,
    GroupsComponent,
    UsersComponent,
    NewUserModalComponent,
    ApprovalModalComponent,
    NewGroupModalComponent,
    UpdateGroupModalComponent,
    UserDetailsComponent,
    UpdateUserModalComponent,
    ClientsComponent,
    CreateClientComponent,
    UpdateClientComponent,
    ServerCredentialsComponent,
    ClientsTableComponent,
    CreateProjectTypeModalComponent,
    UpdateProjectTypeModalComponent,
    CreateReasonComponent,
    UpdateReasonComponent,
    UpdateStatusModalComponent,
    CreateStatusModalComponent,
    CreateTaskTypeModalComponent,
    UpdateTaskTypeModalComponent,
    UpdateDoctypeModalComponent,
    AddDocTypeModalComponent,
    UpdateProjectModalComponent,
    CreateDocTypeModalComponent,
    ProjectTypeComponent,
    TaskTypeComponent,
    DocumentTypesComponent,
    StatusTypesComponent,
    BreadcrumblayoutComponent,
    NotificationsComponent,
    RepositoryComponent,
    ActivityContainerComponent,
    DocumentContainerComponent,
    DragDropDirective,
    ConversationComponent,
    DocumentUpdateComponent,
    TaskContainerComponent,
    UserContainerComponent,
    SettingsContainerComponent,
    ReassignProjectComponent,
    ExtendDuedateComponent,
    DocumentPreviewComponent,
    ProjectTimelineComponent,
    AddActivityComponent,
    ServerAccountComponent,
    ToolsComponent,
    AddServerAccountComponent,
    AddServerCredentialComponent,
    AddServerToolComponent,

  ],
  imports: [
    BrowserModule,
    rootRouting,
    routing,
    AngularButtonLoaderModule.forRoot(),
    LoadingBarModule,
    ImageViewerModule,
    // LoadingBarHttpClientModule,
    // LoadingBarHttpModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ScrollingModule,
    MatInputModule,
    MatNativeDateModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
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
  entryComponents: [
    CreateReasonComponent,
    UpdateReasonComponent,
    AddServerCredentialComponent,
    AddServerToolComponent,
    AddServerAccountComponent,
    ServerCredentialsComponent,
    AddActivityComponent,
    ProjectTimelineComponent,
    ReassignProjectComponent,
    ExtendDuedateComponent,
    DocumentPreviewComponent,
    RepositoryComponent,
    BottomSheetComponent,
    CreateProjectModalComponent,
    NewUserModalComponent,
    ApprovalModalComponent,
    UserDetailsComponent,
    NewGroupModalComponent,
    UpdateGroupModalComponent,
    UpdateUserModalComponent,
    UpdateClientComponent,
    CreateClientComponent,
    UpdateDoctypeModalComponent,
    UpdateProjectModalComponent,
    UpdateProjectTypeModalComponent,
    UpdateStatusModalComponent,
    DocumentUpdateComponent,
    UpdateTaskTypeModalComponent,
    CreateStatusModalComponent,
    CreateProjectTypeModalComponent,
    CreateTaskTypeModalComponent,
    CreateDocTypeModalComponent,
    NotificationsComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProjectService, MatDatepickerModule,AuthGuard, 
    {provide: MAT_DIALOG_DATA, useValue: {}},
    // {provide: MAT_RADIO_DEFAULT_OPTIONS,
    // useValue: { color: 'primary' }
],
  bootstrap: [AppComponent]
})


export class AppModule {
    constructor(ngRedux: NgRedux<any>) {
      ngRedux.provideStore(store);
    }
    // this.ngRedux.provideStore(store);
}
