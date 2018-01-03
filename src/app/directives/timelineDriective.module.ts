import { NgModule } from '@angular/core';
import { Directive, ElementRef, Input,OnInit,Renderer,HostListener} from '@angular/core';


import{DragDirective} from './drag.directive';
import{FlagDirective} from './flag.directive';
import{TestDirective} from './test.directive';
@NgModule({
    declarations:[
        DragDirective,
        FlagDirective,
        TestDirective
    ],
    imports:[],
    exports:[
        DragDirective,
        FlagDirective,
        TestDirective
    ]
})
export class TimelineDirectiveModule{}