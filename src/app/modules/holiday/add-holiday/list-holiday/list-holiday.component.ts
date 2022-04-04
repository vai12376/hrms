/** @format */

import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { HolidayService } from "src/app/core/services/holiday/holiday.service";
import { IHolidayData } from "src/app/shared/model/interfaces";

@Component({
  selector: "app-list-holiday",
  templateUrl: "./list-holiday.component.html",
  styleUrls: ["./list-holiday.component.css"],
})
export class ListHolidayComponent implements OnInit {
  holidayList: any = [];
  @Output() onEditHolidayEvent = new EventEmitter();
  titleSortFlag = true;
  stSortFlag = true;
  edSortFlag = true;

  pageConfig = { itemsPerPage: 2, currentPage: 1 };

  constructor(private hDService: HolidayService) {}

  ngOnInit(): void {
    this.holidayList = this.hDService.getHolidayData();
  }

  onDeleteHoliday(id: String) {
    this.hDService.deleteHolidayData(id);
  }

  pageChange(page: number) {
    this.pageConfig.currentPage = page;
  }
  onRowPerPageChange(e: Event) {
    let rpp = parseInt((e.target as HTMLSelectElement).value);
    this.pageConfig.itemsPerPage = rpp;
    this.pageConfig.currentPage = 1;
  }

  sortStartDate() {
    this.stSortFlag = !this.stSortFlag;
    // let flag = this.stSortFlag;
    this.holidayList.sort((a: IHolidayData, b: IHolidayData) => {
      if (a.startDate < b.startDate) {
        if (this.stSortFlag) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.startDate > b.startDate) {
        if (this.stSortFlag) {
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
    this.holidayList.sort((a: IHolidayData, b: IHolidayData) => {
      if (a.title < b.title) {
        if (this.titleSortFlag) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.title > b.title) {
        if (this.titleSortFlag) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }
}
