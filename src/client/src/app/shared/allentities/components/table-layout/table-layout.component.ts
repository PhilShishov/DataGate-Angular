import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CoreCacheService } from "src/app/core/cache/core-cache.service";
import { IEntitiesViewModel } from "src/app/shared/interfaces/IEntitiesViewModel";
import { DataGateConstants } from "src/app/shared/utils/constants";

@Component({
  selector: 'table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {
  selectedColumns: Array<string>;
  availableColumns: Array<string>;
  filteredColumns: Array<string>;
  preselectedColumns = [];
  searchText: string = '';
  model: IEntitiesViewModel = {} as IEntitiesViewModel;

  @Output() applyEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() defaultEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private coreCacheService: CoreCacheService, public dialogRef: MatDialogRef<TableLayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.preselectedColumns = this.coreCacheService.getByKey(DataGateConstants.PreSelectedColumns);
    this.selectedColumns = this.data.selectedColumns;
    this.availableColumns = this._removePreselectedColumns(this.data.availableColumns,this.selectedColumns);
    this.filteredColumns = this.availableColumns;
  }

  removeAll() {
    this.selectedColumns.forEach(element => {
      this.availableColumns.push(element);
    });
    this.selectedColumns = [];
    this.filteredColumns = this.availableColumns;
  }

  remove(item, index) {
    this.selectedColumns.splice(index, 1);
    this.availableColumns.push(item);
    this.filteredColumns = this.availableColumns;
  }

  addAll() {
    this.availableColumns.forEach(element => {
      this.selectedColumns.push(element);
    });
    this.availableColumns = [];
    this.filteredColumns = this.availableColumns;
  }

  add(item) {
    this.selectedColumns.push(item);
    this.availableColumns.splice(this.availableColumns.indexOf(item), 1);
    this.filteredColumns = this.availableColumns;
  }

  default() {
    this.model.command = 'Default';
    this.dialogRef.close(this.model);
  }

  save() {
    this.model.command = 'Save';
    this.model.selectedColumns = this.selectedColumns;
    this.dialogRef.close(this.model);
  }

  close() {
    this.model.command = 'Close';
    this.dialogRef.close(this.model);
  }

  apply() {
    this.model.selectedColumns = this.selectedColumns;
    this.model.command = 'Apply';
    this.dialogRef.close(this.model);
  }

  filter(searchValue: string) {
    this.filteredColumns = this.availableColumns.filter((item: string) => {
      return item.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  _removePreselectedColumns(columnsToRemoveFrom: Array<string>,columnsToRemove: Array<string>) {
    columnsToRemove.forEach(element => {
      let index = columnsToRemoveFrom.indexOf(element);
      if (index > -1) {
        columnsToRemoveFrom.splice(index, 1);
      }
    });
    return columnsToRemoveFrom;
  }
}
