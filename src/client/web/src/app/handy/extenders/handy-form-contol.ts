import { DefultHandyFormControl, FieldAppearance } from '@handy-ng/core/defaults/extenders/handy-form-control';

export class HandyFormControl extends DefultHandyFormControl {

  public _appearance: FieldAppearance = 'fill';

  protected _parseError(): void {

    if (this.ngControl.touched && this.ngControl.errors) {

      let firstErrKey: string = Object.keys(this.ngControl.errors)[0];

      this._fieldErr = this.ngControl.errors[firstErrKey];
      this._inputField.control.setErrors({ hasErr: 'has' });
      this._inputField.control.markAsTouched();
      this._hasErr = true;

    } else {

      this._inputField.control.setErrors(null);

      this._hasErr = false;
      this._fieldErr = null;

    }

  }

  public registerOnTouched(fn: any): void {

    this.onTouched = () => {

      if (!this._inputField.control.touched && !this._isDestroyed) {

        setTimeout(() => {
          this.onTouched();
        }, 400)

        return;
      }

      fn();
      this._parseError();

    }


  }

}