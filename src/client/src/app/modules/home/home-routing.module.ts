import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IdentityLayoutComponent } from "src/app/core/layouts/identity-layout/container/identity-layout.component";
import { HomeComponent } from "./components/home.component";

const routes: Routes = [
    {
        path: '',
        component: IdentityLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
]

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class HomeRoutingModule{
  
}