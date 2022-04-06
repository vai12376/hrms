/** @format */

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UUID } from "angular2-uuid";
import { HolidayService } from "src/app/core/services/holiday/holiday.service";
import { IHolidayData } from "src/app/shared/model/interfaces";
import { CustomeValidators } from "src/app/shared/validators/custom-validators";
import { Utility } from "src/app/shared/utilities/utility";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-add-holiday",
  templateUrl: "./add-holiday.component.html",
  styleUrls: ["./add-holiday.component.css"],
})
export class AddHolidayComponent implements OnInit {
  minDate: NgbDateStruct;
  addHolidayForm: FormGroup;
  invalidFormSubmited = false;
  holidayList: IHolidayData[];
  @ViewChild("saveBtn") saveBtn: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private hDService: HolidayService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toastrService: ToastrService
  ) {
    let curDate = new Date();
    this.minDate = this.dateToNgb(curDate);

    this.addHolidayForm = this.initializeForm();
    this.holidayList = hDService.holidayList;
  }

  ngOnInit(): void {}

  initializeForm() {
    let form = this.formBuilder.group(
      {
        title: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern(Utility.titleRegExp),
          ],
        ],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
      },
      {
        validator: [CustomeValidators.fromToDate("startDate", "endDate")],
      }
    );
    return form;
  }

  get _addHolidayForm() {
    return this.addHolidayForm.controls;
  }

  ngbToDate(date: NgbDateStruct): Date | null {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }

  dateToNgb(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  onEditHoliday(holidayData: IHolidayData) {
    let newHolidayData = {
      title: holidayData.title,
      startDate: this.dateToNgb(holidayData.startDate),
      endDate: this.dateToNgb(holidayData.endDate),
    };

    this.addHolidayForm.patchValue(newHolidayData);

    if (this.saveBtn) {
      this.saveBtn.nativeElement.innerHTML = "Edit";
    }
  }
  checkTitleExist(title: String) {
    let checkTitleFlag = this.holidayList.findIndex(
      (item) => title === item.title
    );
    if (checkTitleFlag == -1) {
      return false;
    } else {
      return true;
    }
  }
  onSave() {
    if (this.addHolidayForm.valid) {
      //loader starts for add process
      if (this.checkTitleExist(this.addHolidayForm.value.title)) {
        this.toastrService.error("title already exists");
        return;
      }

      this.ngxUiLoaderService.start();
      let formData = this.addHolidayForm.value;
      formData.id = UUID.UUID();
      formData.startDate = this.ngbToDate(formData.startDate);
      formData.endDate = this.ngbToDate(formData.endDate);

      let formNewData: IHolidayData = formData;
      this.hDService.addHolidayData(formNewData);

      this.addHolidayForm.reset();
      this.ngxUiLoaderService.stop();
    } else {
      this.invalidFormSubmited = true;
    }
  }
}
