import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { AdherentComponent } from './components/adherent/adherent.component';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DetailConferenceComponent } from './components/detail-conference/detail-conference.component';
import {MatTabsModule} from "@angular/material/tabs";
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import {Chart} from "chart.js";
import { SignComponent } from './components/sign/sign.component';
import { UserComponent } from './components/user/user.component';
import { PageGestionnaireComponent } from './components/page-gestionnaire/page-gestionnaire.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    ConferenceComponent,
    AdherentComponent,
    DetailConferenceComponent,
    PieChartComponent,
    SignComponent,
    UserComponent,
    PageGestionnaireComponent,
    StatistiqueComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        BrowserAnimationsModule,
        MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
