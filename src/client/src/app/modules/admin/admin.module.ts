import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AppLayoutModule } from './../../core/layouts/app-layout/app-layout.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';
import { AdminCreateComponent } from './create/create.component';
import { UsersComponent } from './all/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminEditComponent } from './edit/edit.component';
import { AdminDeleteComponent } from './delete/delete.component';
import { DialogModule } from 'src/app/core/layouts/ui-input/dialogs/dialog.module';

@NgModule({
    declarations: [
        AdminCreateComponent,
        UsersComponent,
        AdminEditComponent,
        AdminDeleteComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AdminRoutingModule,
        AppLayoutModule,
        TranslateModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        DialogModule
    ],
    providers: [AdminService]
})
export class AdminModule { }
