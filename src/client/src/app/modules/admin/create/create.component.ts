import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { CoreCacheService } from "src/app/core/cache/core-cache.service";
import { ConfirmDialogComponent } from "src/app/core/layouts/ui-input/dialogs/confirm-dialog/confirm-dialog.component";
import { ICreateUserInputModel } from "src/app/shared/interfaces/ICreateUserInputModel";
import { DataGateConstants } from "src/app/shared/utils/constants";
import { MustMatch } from "src/app/shared/validators/equals-validator";
import { AdminService } from "../admin.service";

@Component({
    selector: 'admin-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class AdminCreateComponent implements OnInit {

    createUserModel: ICreateUserInputModel = {} as ICreateUserInputModel;
    createUserForm: FormGroup;
    roles: any = [];

    constructor(private fb: FormBuilder,
        private titleService: Title,
        private translate: TranslateService,
        private adminService: AdminService,
        private router: Router,
        private toastr: ToastrService,
        private matDialog: MatDialog,
        private cacheService: CoreCacheService) {
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.translate.get('Create User').subscribe(str => {
            this.titleService.setTitle(str);
        });
        this.createUserForm = this.fb.group(
            {
                username: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
                confirmPassword: new FormControl('', [Validators.required]),
                roleType: new FormControl('', [Validators.required])
            },
            {
                validator: MustMatch('password', 'confirmPassword')
            }
        );
        this.adminService.getRoles().subscribe(data => {
            this.roles = data;
        });
        this.getRecaptchaValue();
    }

    onSubmit() {
        if (this.createUserForm.valid) {
            const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
                data: { title: 'Are you sure you want to create this?' }
            });
            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    let data = Object.assign({}, this.createUserModel, this.createUserForm.value);
                    this.adminService.create(data).subscribe(res => {
                        this.toastr.info(res);
                        this.router.navigate(['/admin/all']);
                    });
                }
            });
        } else {
            Object.keys(this.createUserForm.controls).forEach(field => {
                const control = this.createUserForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    getRecaptchaValue() {
        this.createUserModel.recaptchaValue = this.cacheService.getByKey(DataGateConstants.googleRecaptchaToken);
    }
}