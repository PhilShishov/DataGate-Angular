import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmDialogComponent } from "src/app/core/layouts/ui-input/dialogs/confirm-dialog/confirm-dialog.component";
import { ICreateUserInputModel } from "src/app/shared/interfaces/ICreateUserInputModel";
import { AdminService } from "../admin.service";

@Component({
    selector: 'delete-user',
    templateUrl: '/delete.component.html',
    styleUrls: ['/delete.component.scss']
})
export class AdminDeleteComponent implements OnInit {

    id: string;
    deleteUserForm: FormGroup;
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
        this.translate.get('Delete User').subscribe(str => {
            this.titleService.setTitle(str);
        });
        this.adminService.get(this.id).subscribe(res => {
            this.user = res;
            this.deleteUserForm.patchValue({ username: res.username });
            this.deleteUserForm.patchValue({ email: res.email });
            this.deleteUserForm.patchValue({ roleType: res.roleType });
        })
        this.deleteUserForm = this.fb.group(
            {
                username: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                roleType: new FormControl('', [Validators.required])
            }
        );
    }

    onSubmit() {
        if (this.deleteUserForm.valid) {
            const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
                data: { title: 'Are you sure you want to delete this?' }
            });

            dialogRef.afterClosed().subscribe((result) => {
                let data = Object.assign({}, this.user, this.deleteUserForm.value);
                this.adminService.delete(data).subscribe(res => {
                    this.toastr.info(res);
                    this.router.navigate(['/admin/all']);
                });
            });
        } else {
            Object.keys(this.deleteUserForm.controls).forEach(field => {
                const control = this.deleteUserForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

}