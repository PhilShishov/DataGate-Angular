import { IBase } from './base';

export interface IEntitiesViewModel extends IBase {
  values: Array<Array<string>>
  headers: Array<Array<string>>
  headersSelection: Array<Array<string>>
  isActive: boolean
  preSelectedColumns: Array<Array<string>>
  selectedColumns: Array<Array<string>>
}
