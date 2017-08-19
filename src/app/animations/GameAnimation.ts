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
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ])
  ]),
  trigger('yourTurn', [
    transition('* => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(-20px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
      ]))
    ])
  ]),
  trigger('out', [
    transition('* => *', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(30px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(-30px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateX(30px)',  offset: 0.7}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1})
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
        style({opacity: 1, offset: 0}),
        style({opacity: 0, offset: 0.5}),
        style({opacity: 1, offset: 1})
      ]))
    ])
  ]),
  trigger('leftColumn', [
    transition('* => *', [
      animate('1s', keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-100%)', offset: 0.5}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1})
      ]))
    ])
  ]),
  trigger('rightColumn', [
    transition('* => *', [
      animate('1s', keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(100%)', offset: 0.5}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1})
      ]))
    ])
  ]),
  trigger('inputButton', [
    transition('* => *', [
      animate(200, keyframes([
        style({opacity: 1, transform: 'scale(1)', marginLeft: '0px', marginRight: '0px', offset: 0}),
        style({opacity: 1, transform: 'scale(2)', marginLeft: '5px', marginRight: '5px', offset: 0.5}),
        style({opacity: 1, transform: 'scale(1)', marginLeft: '0px', marginRight: '0px', offset: 1})
      ]))
    ])
  ]),
  trigger('restartButton', [
    transition('* => *', [
      animate(1000, keyframes([
        style({opacity: 1, transform: 'translateX(-200%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(0)', offset: 0.5}),
        style({opacity: 1, transform: 'scale(2)', offset: 0.8}),
        style({opacity: 1, transform: 'scale(1)',  offset: 1})
      ]))
    ])
  ]),
  trigger('dailyLeaders', [
    transition('* => *', [
      animate(2000, keyframes([
        style({opacity: 1, transform: 'translateY(200%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(200%)', offset: 0.5}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1})
      ]))
    ])
  ])
];
