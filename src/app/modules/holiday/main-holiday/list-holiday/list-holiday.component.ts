/** @format */

import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { IHolidayData } from "src/app/shared/model/interfaces";

@Component({
  selector: "app-list-holiday",
  templateUrl: "./list-holiday.component.html",
  styleUrls: ["./list-holiday.component.css"],
})
export class ListHolidayComponent implements OnInit {
  @Input() holidayList: any = [];

  @Output() onEditEvent = new EventEmitter();
  @Output() onDeleteEvent = new EventEmitter();

  titleSortFlag = true;
  stSortFlag = true;
  edSortFlag = true;
  p: number = 1;
  constructor() {}

  ngOnInit(): void {}

  sortStartDate() {
    this.stSortFlag = !this.stSortFlag;
    let f = this.stSortFlag;
    this.holidayList.sort(function (a: IHolidayData, b: IHolidayData) {
      if (a.startDate < b.startDate) {
        if (f) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.startDate > b.startDate) {
        if (f) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }
  sortEndDate() {}
  sortTitle() {
    this.titleSortFlag = !this.titleSortFlag;
    let f = this.titleSortFlag;
    this.holidayList.sort(function (a: IHolidayData, b: IHolidayData) {
      if (a.title < b.title) {
        if (f) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.title > b.title) {
        if (f) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }
}
