/** @format */

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ToastrModule } from "ngx-toastr";
import { CandidateModule } from "./modules/candidate/candidate.module";
import { EmployeeModule } from "./modules/employee/employee.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HolidayModule } from "./modules/holiday/holiday.module";
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CandidateModule,
    EmployeeModule,
    HolidayModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxUiLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
