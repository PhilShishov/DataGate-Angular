import { Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild, AfterViewInit, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS, NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { animations } from '../ui-input-base/animations';
import { ElementBase } from '../ui-input-base/element-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ui-input-select',
  template: `
  <div class="mat-form-field-flex">
      <div class="mat-form-field-prefix" [ngStyle]="{'width' : labelWidth ? labelWidth : '' }">
          <label matPrefix>{{labelWidth !== '0%' ? name+': ' : ''}}<span class="requiredLabel">{{ required ? "*" : "" }}</span></label>
      </div>
      <div [ngClass]="showDivOrFullDiv() ? 'mat-select-div-full' : 'mat-select-div'">
          <div class="mat-select-input">
              <mat-form-field [ngClass]="{invalid: ((invalid | async) && model.dirty)}">
                  <mat-select placeholder="Seleccione una opción"
                        [(ngModel)]="value"
                        (ngModelChange)="onChange(select, $event)"
                        #select="ngModel"
                        [multiple]="multiple"
                        [id]="identifier"
                        [disabled]="disabled || disabledByState">
                        <mat-option *ngIf="required !== true && multiple !== true && showSelectAll !== true">Seleccione una opción</mat-option>
                        <mat-option *ngIf="multiple === true || showSelectAll === true" [value]="defaultValueSelectAll">Todas</mat-option>
                        <mat-option *ngFor="let item of optionValues" [value]="item[optionValue]" [disabled]="item[optionDisabled]">
                            {{ item[optionText] }}
                        </mat-option>
                  </mat-select>
              </mat-form-field>
          </div>
      </div>
      <validation [@flyInOut]="'in,out'" *ngIf="(invalid | async) && model.dirty" [messages]="failures | async"></validation>
  </div>
  `,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UiInputSelectComponent,
    multi: true,
  }],
  styleUrls: ['./ui-input-select.component.css']
})
export class UiInputSelectComponent extends ElementBase<string> implements OnInit, AfterViewInit {

    @Input() public name: string;
    @Input() public placeholder: string;
    @Input() public labelWidth?: string;
    @Input() public inputHeight?: number;
    @Input() public type?: string;
    @Input() public disabled: any;
    @Input() public required: any;

    @Input() public multiple?: any;
    @Input() public defaultOptionSelectAll: any;
    @Input() public defaultValueSelectAll: any;
    @Input() public showSelectAll: boolean;
    @Input() public optionValues?: Array<any>;
    @Input() public entityCache?: any;
    @Input() public optionValue: string;
    @Input() public optionText: string;
    @Input() public optionDisabled: string;

    disabledByState: boolean;

    preventValues: Array<any> = [];

    @ViewChild(NgModel, { static: true }) model: NgModel;

    public identifier = `ui-input-select-${identifier++}`;

    constructor(
        @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
        @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
        public _elementRef: ElementRef,
        // private _webCacheService: WebCacheService,
        private _injector: Injector,

        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {
        super(validators, asyncValidators);
    }

    public ngOnInit() {
        if (this.required === '') { this.required = true; }
        if (this.disabled === '') { this.disabled = true; }
        if (this.multiple === '') { this.multiple = true; }
        if (this.defaultOptionSelectAll === '') { this.defaultOptionSelectAll = true; }
        if (this.defaultValueSelectAll === '') { this.defaultValueSelectAll = -1; }
        if (this.entityCache) {
            // this.optionValues = this._webCacheService.GetData(this.entityCache);
        }
        if (this.showSelectAll === undefined) { this.showSelectAll = false; }

    }

    public onChange(select, newValue) {
        if (this.multiple && this.defaultOptionSelectAll) {
            const changedValue: Array<any> = [];
            newValue.forEach(element => { changedValue.push(element); });

            if (this.preventValues.indexOf(this.defaultValueSelectAll) === -1 && changedValue[0] === this.defaultValueSelectAll) {
                while (changedValue.length > 1) {
                    changedValue.pop();
                }
            } else if (this.preventValues.indexOf(this.defaultValueSelectAll) >= 0 && changedValue.length > 1) {
                // Eliminar la primera opción (Todos)
                changedValue.splice(0, 1);
            }
            if (changedValue.length !== newValue.length) {
                this.preventValues = changedValue;
                this.model.update.emit(changedValue);
            }
        }
    }

    public showDivOrFullDiv(): boolean {
        return this.labelWidth && (this.labelWidth === '0%' || this.labelZeroInPx());
    }

    private labelZeroInPx(): boolean {
        return this.labelWidth === '0px';
    }

    public getItemValue(value: any) {
        return value[this.optionValue];
    }

    public ngAfterViewInit(): void {
        const ngControl: NgControl = this._injector.get(NgControl, null);
        if (ngControl) {
          this.model = ngControl as NgModel;
        }
    }

}

let identifier = 0;
