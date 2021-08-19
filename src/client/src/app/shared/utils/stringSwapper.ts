import { DataGateConstants } from "./constants";

export class StringSwapper {

  static byController(currentType: string, fund: string, subFund: string, shareClass: string) {
    let result = "";
    switch (currentType.replace(" ", "")) {
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

  static byArea(currentType: string, fund: string, subFund: string, shareClass: string) {
    let result = "";
    switch (currentType.replace(" ", "")) {
      case DataGateConstants.FundArea:
      case DataGateConstants.FundAbbreviation:
        result = fund;
        break;
      case DataGateConstants.DisplaySub + DataGateConstants.FundArea:
      case DataGateConstants.SubFundAbbreviation:
        result = subFund;
        break;
      case DataGateConstants.ShareClassArea:
      case DataGateConstants.ShareClassAbbreviation:
        result = shareClass;
        break;
    }

    return result;
  }
}
