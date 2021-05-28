import { animations } from '../ui-input-base/animations';
import { ElementBase } from '../ui-input-base/element-base';
import { Component, ElementRef, Inject, Input, Optional, ViewChild, EventEmitter, OnInit, AfterViewInit, Injector } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS, NgControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ui-input-checkbox',
  template: `
    <div class="mat-input-flex mat-form-field-flex">
        <div class="mat-form-field-prefix" [ngStyle]="{'width' : labelWidth ? labelWidth : '' }">
            <label matPrefix>{{labelWidth !== '0%' ? name+': ' : ''}}</label>
        </div>
        <div class="mat-input-div">
            <div class="mat-input-input" >
                    <mat-checkbox
                      [(ngModel)]="value"
                      [id]="identifier"
                      [disabled]="disabled"></mat-checkbox>
            </div>
        </div>
        <validation [@flyInOut]="'in,out'" *ngIf="(invalid | async) && model.dirty" [messages]="failures | async"></validation>
    </div>
  `,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UiInputCheckboxComponent,
    multi: true,
  }],
  styleUrls: ['./ui-input-checkbox.component.css']
})
export class UiInputCheckboxComponent extends ElementBase<string> implements OnInit, AfterViewInit {

  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public labelWidth?: string;
  @Input() public inputHeight?: number;
  @Input() public type?: string;
  @Input() public disabled: any;
  @Input() public required: any;

  disabledByState: boolean;

  @ViewChild(NgModel,{static: true}) model: NgModel;

  public identifier = `ui-input-checkbox-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    public _elementRef: ElementRef,
    private _injector: Injector
  ) {
    super(validators, asyncValidators);
  }

  public ngOnInit() {
    if (this.required === '') { this.required = true; }
    if (this.disabled === '') { this.disabled = true; }
  }

  public ngAfterViewInit(): void {
    const ngControl: NgControl = this._injector.get(NgControl, null);
    if (ngControl) {
      this.model = ngControl as NgModel;
    }
  }

}

let identifier = 0;

