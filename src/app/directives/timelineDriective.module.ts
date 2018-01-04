import { NgModule } from '@angular/core';
import { Directive, ElementRef, Input,OnInit,Renderer,HostListener} from '@angular/core';


import{DragDirective} from './drag.directive';
import{FlagDirective} from './flag.directive';
import{RulerDirective} from './ruler.directive';
import{TestDirective} from './test.directive';

@NgModule({
    declarations:[
        DragDirective,
        FlagDirective,
        RulerDirective,
        TestDirective
    ],
    imports:[],
    exports:[
        DragDirective,
        FlagDirective,
        RulerDirective,
        TestDirective
    ]
})
export class TimelineDirectiveModule{}