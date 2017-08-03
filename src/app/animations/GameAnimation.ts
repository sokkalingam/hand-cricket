import {  trigger,
          state,
          style,
          transition,
          animate,
          keyframes,
          group
       } from '@angular/animations';

export const GameAnimation = [
  trigger('runs', [
    transition('* => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(-20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ]))
    ])
  ]),
  trigger('played', [
    transition('* => *', [
      animate(400, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ])
  ]),
  trigger('out', [
    transition('* => *', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 0.4}),
        style({opacity: 1, transform: 'scale(2)',  offset: 0.7}),
        style({opacity: 1, transform: 'scale(1)',  offset: 1})
      ]))
    ])
  ]),
  trigger('wins', [
    transition('* => *', [
      animate(500, keyframes([
        style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(-20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(20px)',  offset: 0.6}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ])
  ]),
  trigger('battingBowling', [
    transition('* => *', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 0.4}),
        style({opacity: 1, transform: 'scale(2)',  offset: 0.7}),
        style({opacity: 1, transform: 'scale(1)',  offset: 1})
      ]))
    ])
  ]),
  trigger('leftColumn', [
    transition('* => *', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(100px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(-100px)',  offset: 0.6}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1})
      ]))
    ])
  ]),
  trigger('rightColumn', [
    transition('* => *', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(-100px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(100px)',  offset: 0.6}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1})
      ]))
    ])
  ]),
  trigger('inputButton', [
    transition('* => *', [
      animate(200, keyframes([
        style({opacity: 1, transform: 'scale(2)', offset: 0.5}),
        style({opacity: 1, transform: 'scale(1)',  offset: 1})
      ]))
    ])
  ])
];
