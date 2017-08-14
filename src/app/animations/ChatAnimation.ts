import {  trigger,
          state,
          style,
          transition,
          animate,
          keyframes,
          group
       } from '@angular/animations';

export const ChatAnimation = [
  trigger('sent', [
    transition('* => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(-30px)',  offset: 0.4}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ])
  ]),
  trigger('received', [
    transition('* => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(30px)',  offset: 0.4}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ])
  ])
];
