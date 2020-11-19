import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CarDataComponent } from './components/car-data/car-data.component';
import { DataService } from './services/data.service';
import { MatTableModule } from "@angular/material/table";
import { MaterialModule } from '../shared-material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from "@angular/material/divider";
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:'full'},
  {path:"home",component:HomeComponent}
]

@NgModule({
  declarations: [HomeComponent, CarDataComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  providers:[DataService]
})
export class AppHomeModule { }
