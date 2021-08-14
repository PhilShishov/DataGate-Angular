import { IBase } from './base';

export interface IEntitiesViewModel extends IBase {
  values: Array<Array<string>>
  headers: Array<string>
  headersSelection: Array<string>
  isActive: boolean
  preSelectedColumns: Array<string>
  selectedColumns: Array<string>
  userName: string
}
