import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/app/utility-services/utility.service';
import { CarModel } from '../../models/car.model';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.scss']
})
export class CarDataComponent implements OnInit {
  @Input() dataSource:MatTableDataSource<CarModel> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'carname', 'model'];
  constructor() { }

  ngOnInit(): void {}
}
