import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation',
  template: `
    <div class="validation">
      <div *ngFor="let message of messages">{{message}}</div>
    </div>
  `,
  styles: [`
    .validation {
      position: absolute;
      width: 60%;
      float: left;
      margin-left: -60%;
      margin-top: -8%;
      font-size: 0.78em;
      color: #b71c1c;
      text-align: left;
    }`
  ]
})
export class ValidationComponent {
  @Input() messages: Array<string>;
}
