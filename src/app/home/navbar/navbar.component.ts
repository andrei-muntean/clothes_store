import { trigger, style, group, animate, transition, state, keyframes } from '@angular/animations';
import { CategoriesService } from '../../categories.service';
import { ICategory } from '../../models';
import { Component, OnInit, HostListener } from '@angular/core';
import * as kf from '../../../animations'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
            })),
            state('out', style({
                'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
            })),
            transition('in => out', [group([
                animate('400ms ease-in-out', style({
                    'opacity': '0'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '0px'
                })),
                animate('700ms ease-in-out', style({
                    'visibility': 'hidden'
                }))
            ]
            )]),
            transition('out => in', [group([
                animate('1ms ease-in-out', style({
                    'visibility': 'visible'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '500px'
                })),
                animate('800ms ease-in-out', style({
                    'opacity': '1'
                }))
            ]
            )])
        ]),
        trigger('navButtons', [
            transition('* => fadeInDown-1', animate(600, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown0', animate(700, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown1', animate(800, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown2', animate(900, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown3', animate(1000, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown4', animate(1100, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown5', animate(1200, keyframes(kf.fadeInDown))),
            transition('* => fadeInDown6', animate(1300, keyframes(kf.fadeInDown))),
            transition('* => fadeIn', animate(1300, keyframes(kf.fadeIn)))
        ])
    ]
})
export class NavbarComponent implements OnInit {

    categories: ICategory[] = [];
    collapsed = true;
    animationState = 'out';
    shouldAnimateNav = false;

    constructor(categoryService: CategoriesService) {
        this.getScreenSize();
        // load categories
        categoryService.getCategories().subscribe((data: any) => {
            this.categories = data;
        })
    }

    ngOnInit() { }

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
        this.animationState = !this.collapsed ? 'in' : 'out';
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        let scrHeight = window.innerHeight;
        let scrWidth = window.innerWidth;
        this.shouldAnimateNav = scrWidth <= 450 && scrHeight <= 825;
    }
}
