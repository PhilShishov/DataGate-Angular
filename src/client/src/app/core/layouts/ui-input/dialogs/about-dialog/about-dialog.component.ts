import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-about',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent {
  currentYear: number;

  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) {
      this.currentYear = new Date().getUTCFullYear();
  }



  close(): void {
    this.dialogRef.close();
  }
}
