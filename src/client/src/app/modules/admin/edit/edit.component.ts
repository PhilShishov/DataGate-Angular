import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmDialogComponent } from "src/app/core/layouts/ui-input/dialogs/confirm-dialog/confirm-dialog.component";
import { ICreateUserInputModel } from "src/app/shared/interfaces/ICreateUserInputModel";
import { MustMatch } from "src/app/shared/validators/equals-validator";
import { AdminService } from "../admin.service";

@Component({
    selector: 'edit-user',
    templateUrl: '/edit.component.html',
    styleUrls: ['/edit.component.scss']
})
export class AdminEditComponent implements OnInit {

    id: string;
    editUserForm: FormGroup;
    user: ICreateUserInputModel;

    constructor(private route: ActivatedRoute,
        private fb: FormBuilder,
        private titleService: Title,
        private translate: TranslateService,
        private adminService: AdminService,
        private router: Router,
        private toastr: ToastrService,
        private matDialog: MatDialog) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.translate.get('Create User').subscribe(str => {
            this.titleService.setTitle(str);
        });
        this.adminService.get(this.id).subscribe(res => {
            this.user = res;
            this.editUserForm.patchValue({ username: res.username });
            this.editUserForm.patchValue({ email: res.email });
            this.editUserForm.patchValue({ roleType: res.roleType });
        })
        this.editUserForm = this.fb.group(
            {
                username: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                passwordhash: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
                confirmPassword: new FormControl('', [Validators.required]),
                roleType: new FormControl('', [Validators.required])
            },
            {
                validator: MustMatch('password', 'confirmPassword')
            }
        );
    }

    onSubmit() {
        if (this.editUserForm.valid) {
            const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
                data: { title: 'Are you sure you want to update this?' }
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    let data = Object.assign({}, this.user, this.editUserForm.value);
                    this.adminService.edit(data).subscribe(res => {
                        this.toastr.info(res);
                        this.router.navigate(['/admin/all']);
                    });
                }
            });
        } else {
            Object.keys(this.editUserForm.controls).forEach(field => {
                const control = this.editUserForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

}