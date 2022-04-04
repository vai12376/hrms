/** @format */

import { Injectable } from "@angular/core";
import { IHolidayData } from "src/app/shared/model/interfaces";

@Injectable({
  providedIn: "root",
})
export class HolidayService {
  holidayList: IHolidayData[] = [];
  constructor() {}

  getHolidayData() {
    return this.holidayList;
  }
  addHolidayData(holidayData: IHolidayData) {
    this.holidayList.push(holidayData);
  }

  deleteHolidayData(id: String) {
    let index = this.holidayList.findIndex((i) => i.id === id);
    this.holidayList.splice(index, 1);
  }
}
