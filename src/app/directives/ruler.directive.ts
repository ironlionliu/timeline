import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import * as $ from 'jquery';
@Directive({
    selector: '[timeline-ruler]',
})
export class RulerDirective implements OnInit {
    private eleDom;

    constructor(
        private ele: ElementRef
    ){
        this.eleDom = $(this.ele.nativeElement);
    }


    @Input('rulermarker') rulermarker;

    @Input('rulermarkerposition')
    set renderRuler(rulermarkerposition){
        this.eleDom.css("left",this.rulermarker["position"]);
        // $(this.eleDom).animate({
        //     left:this.rulermarker["position"]
        // },500);
    }
    ngOnInit() {
    }

}