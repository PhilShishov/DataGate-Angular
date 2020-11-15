import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarModel } from '../../models/car.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carList: MatTableDataSource<CarModel> = new MatTableDataSource();
  carForm: FormGroup;
  
  constructor(private dataService:DataService,private formBuilder:FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.carForm = this.createForm();
    this.spinner.show();
    this.dataService.getCardData().subscribe(res => {
      this.carList.data = res;
      this.spinner.hide();
    })
  }

  createForm() {
    return this.formBuilder.group({
      carname: ['', Validators.required],
      model:['',Validators.required]
    })
  }

  onSubmit() {
    if (!this.carForm.valid) {
      return;
    }

    const result = Object.assign({}, this.carForm.value);

    this.dataService.addCarData(result).subscribe(res => {})
  }
}
