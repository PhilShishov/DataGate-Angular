import { DataGateConstants } from 'src/app/shared/utils/constants';
import { Component, Input } from "@angular/core";
import { IEntitiesViewModel } from "src/app/shared/interfaces/IEntitiesViewModel";

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html'
})
export class ViewTableComponent{

  @Input() controller: string;
  @Input() model: IEntitiesViewModel

  IndexEntityIdInTable = DataGateConstants.indexEntityIdInTable;
  entityAbr: string;
  routeDetails: string;

  constructor(){
    this.entityAbr = this.byController(this.controller,DataGateConstants.FundAbbreviation,DataGateConstants.SubFundAbbreviation,DataGateConstants.ShareClassAbbreviation);
    this.routeDetails = this.byController(this.controller,DataGateConstants.RouteDetails + DataGateConstants.FundArea,DataGateConstants.RouteDetails + DataGateConstants.DisplaySub + DataGateConstants.FundArea,DataGateConstants.RouteDetails + DataGateConstants.ShareClassArea);
  }

  byController(currentType: string,fund: string,subFund: string, shareClass: string){
    let result = "";
    switch (currentType.replace(" ", ""))
    {
        case DataGateConstants.FundsController:
        case DataGateConstants.FundArea + DataGateConstants.ActionDetails:
        case DataGateConstants.FundArea + DataGateConstants.DisplaySub + DataGateConstants.FundsController:
            result = fund;
            break;
        case DataGateConstants.DisplaySub + DataGateConstants.FundsController:
        case DataGateConstants.DisplaySub + DataGateConstants.FundArea + DataGateConstants.ActionDetails:
        case DataGateConstants.SubFundShareClassesController:
            result = subFund;
            break;
        case DataGateConstants.ShareClassesController:
        case DataGateConstants.ShareClassArea + DataGateConstants.ActionDetails:
            result = shareClass;
            break;
    }

    return result;
  }

  getRoute(id,date){
    return this.routeDetails + id + date;
  }
}
