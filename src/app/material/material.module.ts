
import { MatToolbarModule,
  MatCheckboxModule,
   MatButtonModule,
    MatSidenavModule,
     MatIconModule,
      MatListModule
     } from '@angular/material';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
     MatCheckboxModule,
      MatIconModule,
      MatSidenavModule,
      MatFormFieldModule,
      MatCardModule,
      MatDividerModule,
      MatInputModule,
      MatSelectModule,
      MatGridListModule,
      MatTableModule,
      MatPaginatorModule,
      MatListModule,
      MatSortModule,
      MatExpansionModule,
      MatTooltipModule,
      MatMenuModule,
      MatBottomSheetModule,
      MatBadgeModule
    ],

  exports: [
    MatToolbarModule,
    MatButtonModule,
     MatCheckboxModule,
      MatIconModule,
      MatSidenavModule,
      MatFormFieldModule,
      MatCardModule,
      MatDividerModule,
      MatInputModule,
      MatSelectModule,
      MatGridListModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatListModule,
      MatExpansionModule,
      MatTooltipModule,
      MatMenuModule,
      MatBottomSheetModule,
      MatBadgeModule
    ],

})
export class MaterialModule { }
