import { Router } from '@angular/router';
import { Component, Input } from "@angular/core";
import { ITbPrimeShareClass } from "src/app/shared/interfaces/ITbPrimeShareClass";
import { WebDatePipe } from 'src/app/shared/pipes/webDate.pipe';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input() tbPrimeShareClasses: ITbPrimeShareClass[];

  constructor(private router: Router) { }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "vertical": true,
    "verticalSwiping": true,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": true,
    "prevArrow": '<div class="slick-prev" style="left: 44%;top:-3%;transform: rotate(90deg)"></div>',
    "nextArrow": '<div class="slick-next" style="left: 44%;top:98%;transform: rotate(90deg)"></div>',
  };

  getShareClassLink(scId: number) {
    let pipe = new WebDatePipe('en-US');
    var formatted = pipe.transform(new Date());
    return '/sc/' + scId + '/' + formatted;
  }
}

