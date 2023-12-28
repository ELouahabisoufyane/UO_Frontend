import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AdminComponent} from "./components/admin/admin.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ConferenceComponent} from "./components/conference/conference.component";
import {AdherentComponent} from "./components/adherent/adherent.component";
import {DetailConferenceComponent} from "./components/detail-conference/detail-conference.component";

const routes: Routes = [
  {path: "",component:LoginComponent},
  {path: "admin",component:AdminComponent,children:[
      {path: "dashboard",component:DashboardComponent},
      {path: "conference",component:ConferenceComponent},
      {path:"detail/:id",component:DetailConferenceComponent},
      {path: "adherent",component:AdherentComponent}

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
