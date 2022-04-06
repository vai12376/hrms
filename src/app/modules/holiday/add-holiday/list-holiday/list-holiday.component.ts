/** @format */

import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { HolidayService } from "src/app/core/services/holiday/holiday.service";
import { IHolidayData } from "src/app/shared/model/interfaces";
import { Utility } from "src/app/shared/utilities/utility";
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

  pageConfig = Utility.pageConfig;

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
    let rowPerPage = parseInt((e.target as HTMLSelectElement).value);
    this.pageConfig.itemsPerPage = rowPerPage;
    this.pageConfig.currentPage = 1;
  }

  sortStartDate() {
    this.stSortFlag = !this.stSortFlag;
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

  sortEndDate() {
    this.edSortFlag = !this.edSortFlag;
    this.holidayList.sort((a: IHolidayData, b: IHolidayData) => {
      if (a.endDate < b.endDate) {
        if (this.edSortFlag) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.endDate > b.endDate) {
        if (this.edSortFlag) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }
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
