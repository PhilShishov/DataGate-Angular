import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/modules/account/account.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [AuthGuardService],
    declarations: []
})
export class AuthorizationServiceModule { }


