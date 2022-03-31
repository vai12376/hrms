/** @format */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddHolidayComponent } from "./main-holiday/add-holiday/add-holiday.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListHolidayComponent } from "./main-holiday/list-holiday/list-holiday.component";
import { MainHolidayComponent } from "./main-holiday/main-holiday.component";

@NgModule({
  declarations: [
    AddHolidayComponent,
    ListHolidayComponent,
    MainHolidayComponent,
  ],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports: [MainHolidayComponent],
})
export class HolidayModule {}
