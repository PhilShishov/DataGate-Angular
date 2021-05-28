import { ValidationComponent } from './ui-input/ui-input-base-validators/validation';
import { UiInputTextComponent } from './ui-input/ui-input-text/ui-input-text.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MaterialFormsModule } from "../material/material-forms.module";
import { ValidateFormErrorsService } from "./form-errors/validate-form-errors.service";
import { UiInputCheckboxComponent } from './ui-input/ui-input-check/ui-input-checkbox.component';
import { UiInputNumberComponent } from './ui-input/ui-input-number/ui-input-number.component';
import { UiInputSelectComponent } from './ui-input/ui-input-select/ui-input-select.component';
import { UiInputTextAreaComponent } from './ui-input/ui-input-textarea/ui-input-textarea.component';

@NgModule({
  imports: [
    MaterialFormsModule
  ],
  declarations: [
    UiInputCheckboxComponent,
    UiInputNumberComponent,
    UiInputSelectComponent,
    UiInputTextComponent,
    UiInputTextAreaComponent,
    ValidationComponent
  ],
  providers: [
    ValidateFormErrorsService
  ],
  exports: [
    UiInputCheckboxComponent,
    UiInputNumberComponent,
    UiInputSelectComponent,
    UiInputTextComponent,
    UiInputTextAreaComponent,
    ValidationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormControlsModule {}
