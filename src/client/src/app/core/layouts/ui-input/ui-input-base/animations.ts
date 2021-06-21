import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations: Array<AnimationTriggerMetadata> = [
  trigger('flyInOut', [
    state('in', style({ opacity: 1})),
    transition('void => *', [
      style({ opacity: 0.0 }),
      animate(500)
    ]),
    state('out', style({ opacity: 0.3 })),
    transition('* => void', [
      animate(500, style({ opacity: 1}))
    ])
  ])
];

