/** @format */

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-holiday",
  templateUrl: "./add-holiday.component.html",
  styleUrls: ["./add-holiday.component.css"],
})
export class AddHolidayComponent implements OnInit {
  minDate: NgbDateStruct;
  addHolidayForm: FormGroup;
  invalidFormSubmited = false;

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
    let form = this.formBuilder.group({
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
    });
    return form;
  }
  get _addHolidayForm() {
    return this.addHolidayForm.controls;
  }

  onSave() {
    if (this.addHolidayForm.valid) {
      console.log(this.addHolidayForm.value);
    } else {
      this.invalidFormSubmited = true;
    }
  }
}
