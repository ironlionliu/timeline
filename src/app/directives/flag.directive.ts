import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import * as $ from 'jquery';
@Directive({
    selector: '[timeline-flag]',
})
export class FlagDirective implements OnInit {

    private eleDom;
    private animate = [];
    private marker;
    private pole;
    private 
    private init = false;
    constructor(
        private ele: ElementRef
    ) {
        
        
        this.eleDom = $(this.ele.nativeElement);
        this.eleDom.css("left","0px");
        
        
    }
    ngOnInit() {
        
        
        this.marker = $(this.eleDom).children('div.marker');
        this.pole = $(this.eleDom).children('div.pole');
        this.marker.css("top",this.flag["layer"] + 'px');
        this.marker.width(this.timeline["flagWidth"]);
        this.marker.height(this.timeline["flagHeight"]);
        this.init = true;
        
    }
    @Input('timeline') timeline;
    @Input('flag') flag;
    @Input('flagposition')
    set flagPosition(flagPosition) {
        if (null != flagPosition) {
            this.renderFlag();
        }

    }
    private renderRuler(){
        
    }
    private renderFlag() {


        if(this.animate.length > 0){
            this.animate.forEach((animation)=>{animation.stop()});
        }
        
        if (this.init != true) {
            this.eleDom.css("left",this.flag["position"]);
        } else {
            
            this.animate[0] = $(this.eleDom).animate({
                left: this.flag["position"] + "px"
            }, 500);
            this.animate[1] = $(this.marker).animate({
                top: this.flag["layer"] + "px"
            },500);
        }
    }

    @HostListener('document:click')
    initOver(){
        if(!this.timeline["init"]){
            this.timeline["init"] = true;
        }
    }
}