import { DatePipe } from '@angular/common';
import { IEntitiesViewModel } from 'src/app/shared/interfaces/IEntitiesViewModel';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TableLayoutComponent } from '../table-layout/table-layout.component';
import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { DataGateConstants } from 'src/app/shared/utils/constants';
import { LayoutService } from '../layout.service';
import { ISaveLayoutInputModel } from 'src/app/shared/interfaces/ISaveLayoutInputModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'all-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolBarComponent implements OnInit {

  currentDate = new Date();
  @Input() tableData: IEntitiesViewModel;
  @Input() controllerName: string;
  @Input() areaOfOrigin: string;
  @Input() userName: string;

  model: IEntitiesViewModel = {} as IEntitiesViewModel;

  @Input() roles = [];
  @Output() extractEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateEvent: EventEmitter<IEntitiesViewModel> = new EventEmitter<IEntitiesViewModel>();
  @Output() restoreEvent: EventEmitter<any> = new EventEmitter<any>();

  showTableLayout: boolean = false;
  preselectedColumns: [];
  headers = [];
  headersSelection = [];

  constructor(private coreCacheService: CoreCacheService,
    private matDialog: MatDialog,
    private datePipe: DatePipe,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.preselectedColumns = this.coreCacheService.getByKey(DataGateConstants.PreSelectedColumns);
  }

  ngOnInit(): void {
    this.headers = this._removePreselectedColumns([...this.tableData.headers]);
    this.headersSelection = this._removePreselectedColumns([...this.tableData.headersSelection]);
    this._prepareColumns();
    console.log(this.headers);
    console.log(this.headersSelection);
  }

  extractExcel() {
    this.extractEvent.emit('excel');
  }

  extractPDF() {
    this.extractEvent.emit('PDF');
  }

  openLayout() {
    const dialogRef = this.matDialog.open(TableLayoutComponent, {
      data: { selectedColumns: this.headers, availableColumns: this.headersSelection }
    });

    dialogRef.afterClosed().subscribe((result: IEntitiesViewModel) => {
      if (result) {
        switch (result.command) {
          case 'Default':
            this.layoutService.default(this.controllerName, this.userName).subscribe(res => {
              this.toastr.success('Default Layout restored');
              this.restoreEvent.emit();
            })
            break;
          case 'Save':
            let saveLayoutInputModel: ISaveLayoutInputModel = {} as ISaveLayoutInputModel;
            saveLayoutInputModel.selectedColumns = result.selectedColumns;
            saveLayoutInputModel.controllerName = this.controllerName;
            saveLayoutInputModel.areaOrigin = this.areaOfOrigin;
            saveLayoutInputModel.userName = this.userName;
            this.layoutService.save(saveLayoutInputModel).subscribe(res => {
              this.toastr.success('Layout Saved');
              this.restoreEvent.emit();
            });
            break;
          case 'Apply':
            this.model = result;
            this._submit();
            break;
          default:
            break;
        }
      }
    });
  }

  update() {
    this.model.command = 'update';
    this._submit();
  }

  toggleActive(event) {
    this.model.isActive = event.target.checked;
    this._submit();
  }

  _submit() {
    this.model.date = this.datePipe.transform(this.currentDate.toString(), "yyyy-MM-dd");
    this.model.preSelectedColumns = this.preselectedColumns;
    this.model.isActive = this.tableData.isActive;
    this.updateEvent.emit(this.model);
  }

  _prepareColumns() {
    if (this._isEqual(this.headers, this.headersSelection)) {
      this.headers = new Array<string>();
    }
    else {
      this.headers.forEach(element => {
        let index = this.headersSelection.indexOf(element);
        if (index > -1) {
          this.headersSelection.splice(index, 1);
        }
      });
    }
  }

  _isEqual(a, b) {
    // if length is not equal
    if (a.length != b.length)
      return false;
    else {
      // comapring each element of array
      for (var i = 0; i < a.length; i++)
        if (a[i] != b[i])
          return false;
      return true;
    }
  }

  _removePreselectedColumns(headers: Array<string>) {
    this.preselectedColumns.forEach(element => {
      let index = headers.indexOf(element);
      if (index > -1) {
        headers.splice(index, 1);
      }
    });
    return headers;
  }
}
