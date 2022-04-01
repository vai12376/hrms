/** @format */

import { Component, Input, OnInit } from "@angular/core";
import { IHolidayData } from "src/app/shared/model/interfaces";

@Component({
  selector: "app-main-holiday",
  templateUrl: "./main-holiday.component.html",
  styleUrls: ["./main-holiday.component.css"],
})
export class MainHolidayComponent implements OnInit {
  holidayList: any = [];
  constructor() {}

  ngOnInit(): void {}

  onAddHoliday(holidayData: IHolidayData) {
    this.holidayList.push(holidayData);
  }
}
