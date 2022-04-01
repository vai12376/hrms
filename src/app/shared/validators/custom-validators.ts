/** @format */

import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomeValidators {
  static fromToDate(startDateField: string, endDateField: string) {
    return (formGroup: FormGroup) => {
      const startDate = formGroup.controls[startDateField].value;
      const endDate = formGroup.controls[endDateField].value;
      let stDate = startDate
        ? new Date(startDate.year, startDate.month - 1, startDate.day)
        : null;
      let edDate = endDate
        ? new Date(endDate.year, endDate.month - 1, endDate.day)
        : null;

      if (stDate !== null && edDate !== null) {
        if (stDate > edDate) {
          formGroup.controls[endDateField].setErrors({ fromToDate: true });
        } else {
          formGroup.controls[endDateField].setErrors(null);
        }
      }
    };
  }
}
