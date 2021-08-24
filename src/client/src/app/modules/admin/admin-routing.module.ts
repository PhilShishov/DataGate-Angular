import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

import { AppLayoutComponent } from 'src/app/core/layouts/app-layout/components/container/app-layout.component';
import { UsersComponent } from './all/users.component';
import { AdminCreateComponent } from './create/create.component';
import { AdminDeleteComponent } from './delete/delete.component';
import { AdminEditComponent } from './edit/edit.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'create', component: AdminCreateComponent },
            { path: 'edit/:id', component: AdminEditComponent },
            { path: 'delete/:id', component: AdminDeleteComponent },
            { path: 'all', component: UsersComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
