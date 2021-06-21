import { Pipe, PipeTransform } from '@angular/core';
   import { DatePipe } from '@angular/common';

   @Pipe({
     name: 'webDate'
   })
   export class WebDatePipe extends
                DatePipe implements PipeTransform {
     transform(value: any, args?: any): any {
       return super.transform(value, "yyyy-MM-dd");
     }
   }
