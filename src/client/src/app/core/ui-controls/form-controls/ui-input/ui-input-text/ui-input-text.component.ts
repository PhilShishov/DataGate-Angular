import { animations } from '../ui-input-base/animations';
import { ElementBase } from '../ui-input-base/element-base';
import { Component, ElementRef, Inject, Input, Optional, ViewChild, OnInit, AfterViewInit, Injector } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS, NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ui-input-text',
  template: `
    <div class="mat-input-flex mat-form-field-flex">
        <div class="mat-form-field-prefix" [ngStyle]="{'width' : labelWidth ? labelWidth : '' }">
            <label matPrefix>{{labelWidth !== '0%' ? name+': ' : ''}}<span class="requiredLabel">{{ required ? "*" : "" }}</span></label>
        </div>
        <div class="mat-input-div">
            <div class="mat-input-input">
                <mat-form-field [ngClass]="{invalid: ((invalid | async) && model.dirty)}">
                  <input matInput
                      [placeholder]="placeholder"
                      [(ngModel)]="value"
                      [type]="hide ? 'password' : 'text'"
                      [ngModelOptions]="{updateOn: 'blur'}"
                      [id]="identifier"
                      [ngStyle]="{'height' : inputHeight ? inputHeight : '' }"
                      [disabled]="disabled">
                      <button *ngIf="type === 'password'" mat-icon-button matSuffix (click)="hide = !hide; hide? type = 'password': 'text'" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                        <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
                      </button>
                </mat-form-field>
            </div>
        </div>
        <!-- <validation [@flyInOut]="'in,out'" *ngIf="invalid && model.dirty" [messages]="failures"></validation> -->
    </div>
  `,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UiInputTextComponent,
    multi: true,
  }],
  styleUrls: ['./ui-input-text.component.css']
})
export class UiInputTextComponent extends ElementBase<string> implements OnInit, AfterViewInit {

  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public labelWidth?: string;
  @Input() public inputHeight?: number;
  @Input() public type?: string;
  @Input() public disabled: any;
  @Input() public required: any;

  hide: boolean = true;

  @ViewChild(NgModel, { static: true }) model: NgModel;

  public identifier = `ui-input-text-${identifier++}`;

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
