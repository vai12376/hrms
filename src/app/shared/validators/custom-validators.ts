/** @format */

import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class CustomeValidators {
  static fromToDate(startDateField: string, endDateField: string) {
    return (formGroup: FormGroup) => {
      const startDate = formGroup.controls[startDateField].value;
      const endDate = formGroup.controls[endDateField].value;
      if (
        formGroup.controls[endDateField].errors?.["ngbDate"] ||
        formGroup.controls[startDateField].errors?.["ngbDate"]
      ) {
        console.log("invalid");
      } else {
        let edDate = endDate
          ? new Date(endDate.year, endDate.month - 1, endDate.day)
          : null;
        let stDate = startDate
          ? new Date(startDate.year, startDate.month - 1, startDate.day)
          : null;

        if (stDate !== null && edDate !== null) {
          if (stDate > edDate) {
            formGroup.controls[endDateField].setErrors({ fromToDate: true });
          } else {
            formGroup.controls[endDateField].setErrors(null);
          }
        }
      }
    };
  }
}
