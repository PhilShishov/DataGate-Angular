import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'confirm-dialog',
    templateUrl: '/confirm-dialog.component.html',
    styleUrls: ['/confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    title: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.title = this.data.title;
    }

    onYesClick() {
        this.dialogRef.close(true);
    }

    onNoClick() {
        this.dialogRef.close(false);
    }
}