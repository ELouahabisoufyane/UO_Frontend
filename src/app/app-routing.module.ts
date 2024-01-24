import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AdminComponent} from "./components/admin/admin.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ConferenceComponent} from "./components/conference/conference.component";
import {AdherentComponent} from "./components/adherent/adherent.component";
import {DetailConferenceComponent} from "./components/detail-conference/detail-conference.component";
import {SignComponent} from "./components/sign/sign.component";
import {UserComponent} from "./components/user/user.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {PageGestionnaireComponent} from "./components/page-gestionnaire/page-gestionnaire.component";
import {StatistiqueComponent} from "./components/statistique/statistique.component";

const routes: Routes = [
  {path: "",component:LoginComponent},
  {path: "login",component:LoginComponent},
  {path: "sign",component:SignComponent},
  {path: "admin",component:AdminComponent,children:[
      {path: "dashboard",component:DashboardComponent},
      {path: "conference",component:ConferenceComponent},
      {path:"detail/:id",component:DetailConferenceComponent},
      {path: "adherent",component:AdherentComponent},
      {path: "user",component:UserComponent},
      {path: "gest",component:PageGestionnaireComponent},
      {path: "statistique",component:StatistiqueComponent}

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
