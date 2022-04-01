/** @format */

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { IHolidayData } from "src/app/shared/model/interfaces";
import { CustomeValidators } from "src/app/shared/validators/custom-validators";

@Component({
  selector: "app-add-holiday",
  templateUrl: "./add-holiday.component.html",
  styleUrls: ["./add-holiday.component.css"],
})
export class AddHolidayComponent implements OnInit {
  minDate: NgbDateStruct;
  addHolidayForm: FormGroup;
  invalidFormSubmited = false;
  @Output() addHolidayEvent = new EventEmitter<IHolidayData>();

  constructor(private formBuilder: FormBuilder) {
    let curDate = new Date();

    this.minDate = {
      year: curDate.getFullYear(),
      month: curDate.getMonth() + 1,
      day: curDate.getDate(),
    };
    console.log(this.minDate);
    this.addHolidayForm = this.initializeForm();
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

  toDate(date: NgbDateStruct): Date | null {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
  onSave() {
    if (this.addHolidayForm.valid) {
      let formData = this.addHolidayForm.value;
      formData.startDate = this.toDate(formData.startDate);
      formData.endDate = this.toDate(formData.endDate);

      let formNewData: IHolidayData = formData;
      this.addHolidayEvent.emit(formNewData);
      this.addHolidayForm.reset();
    } else {
      this.invalidFormSubmited = true;
    }
  }
}
