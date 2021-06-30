import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NotFoundComponent } from "src/app/components/not-found/not-found.component";
import { IdentityLayoutModule } from "src/app/core/layouts/identity-layout/identity-layout.module";
import { SnackBarsModule } from "src/app/core/layouts/ui-input/snackbars/snackbars.module";
import { HomeComponent } from "./components/home.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations: [
        HomeComponent,
        NotFoundComponent
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        IdentityLayoutModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SnackBarsModule
    ],
    providers: [
    ]
})
export class HomeModule {
}