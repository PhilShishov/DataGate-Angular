import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { IEntitiesViewModel } from './../../../interfaces/IEntitiesViewModel';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { DataGateConstants } from 'src/app/shared/utils/constants';
import { StringSwapper } from '../../../utils/stringSwapper';
import { tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'all-viewtable',
  templateUrl: './viewtable.component.html',
  styleUrls: ['./viewtable.component.scss']
})
export class ViewTableComponent implements OnInit, AfterViewInit {
  @Input() model: IEntitiesViewModel;
  @Input() controller: string;
  @Input() columns: Array<string>;
  @Input() dataSource: MatTableDataSource<any>;

  IndexEntityIdInTable = DataGateConstants.indexEntityIdInTable;
  entityAbr: string;
  routeDetails: string;
  isLargeScreen: boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('tableToExtract') tableToExtract;

  constructor(private datePipe: DatePipe, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.entityAbr = StringSwapper.byController(this.controller, DataGateConstants.FundAbbreviation, DataGateConstants.SubFundAbbreviation, DataGateConstants.ShareClassAbbreviation);
    this.routeDetails = StringSwapper.byController(this.controller, DataGateConstants.RouteDetails + DataGateConstants.FundArea, DataGateConstants.RouteDetails + DataGateConstants.DisplaySub + DataGateConstants.FundArea, DataGateConstants.RouteDetails + DataGateConstants.ShareClassArea);
    this.breakpointObserver.observe([
      '(min-width: 600px)'
    ]).pipe(
      tap(result => this.isLargeScreen = result.matches)
    ).subscribe(result => {
      if (result.matches) {
        this.dataSource.paginator = this.paginator;
      } else {
        this.dataSource.paginator = null;
      }
    });
  }

  getRoute(id) {
    let date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    return "/" + this.entityAbr + "/" + id + "/" + date;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  getPageSizeOptions() {
    if (this.dataSource.data.length > 20) {
      return [10, 25, 50, this.dataSource.data.length];
    }
    else {
      return [10, 25, 50];
    }
  }
}
