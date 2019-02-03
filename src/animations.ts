import { style } from '@angular/animations';

export const fadeInLeft = [
    style({ opacity: 0, transform: 'translate3d(-100%, 0, 0)', offset: 0 }),
    style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 })
]

export const fadeOutLeft = [
    style({ opacity: 1, offset: 0 }),
    style({ opacity: 0, transform: 'translate3d(-100%, 0, 0)', offset: 1 })
]

export const fadeInRight = [
    style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', offset: 0 }),
    style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 })
]

export const fadeOutRight = [
    style({ opacity: 1, offset: 0 }),
    style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', offset: 1 })
]

export const fadeIn = [
    style({ opacity: 0, offset: 0 }),
    style({ opacity: 1, offset: 1 })
]

export const fadeInDown = [
    style({ opacity: 0, transform: 'translate3d(0, -100%, 0)', offset: 0 }),
    style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 })
]

export const fadeInUp = [
    style({ opacity: 0, transform: 'translate3d(0, 100%, 0)', offset: 0 }),
    style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 })
]

export const bounceInUp = [
    style({ opacity: 0, transform: 'translate3d(0, 3000px, 0)', offset: 0 }),
    style({ opacity: 1, transform: 'transform: translate3d(0, -20px, 0);', offset: 0.6 }),
    style({ transform: 'transform: translate3d(0, 10px, 0);', offset: 0.75 }),
    style({ transform: 'transform: translate3d(0, -5px, 0);', offset: 0.9 }),
    style({ transform: 'transform: translate3d(0, 0, 0);', offset: 1 }),
]