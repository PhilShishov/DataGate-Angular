import { Component } from "@angular/core";
import { DataGateConstants } from "src/app/shared/utils/constants";

@Component({
    selector: 'app-not-found-auth',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent{
    currentDate =  new Date();
    cYear = this.currentDate.getFullYear();

    appFooter = DataGateConstants.AppFooter;
}
