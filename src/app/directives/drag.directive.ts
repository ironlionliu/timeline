import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import * as $ from 'jquery';
@Directive({
    selector: '[timeline-drag]',
})
export class DragDirective {
    private dragging = false;
    private mouseOldX = -1;
    private mouseOldY = -1;
    private initLeft = null;
    private dragDom = null;
    private animate = null;
    constructor(
        private ele: ElementRef
    ) {
        this.dragDom = this.ele.nativeElement;


    }
    @Input('timeline') timeline;
    @Input('offset')
    set positionDrag(offset) {
        if(this.animate!=null){
            this.animate.stop();
        }
        if (null != this.timeline) {

            var containerWidth = this.timeline["containerWidth"];
            var offset = this.timeline["offset"];
            if (this.timeline["init"] != true) {
                this.dragDom.style.width = containerWidth * this.timeline["dragWidth"] + 'px';
                this.dragDom.style.left = -(containerWidth * (this.timeline["dragWidth"] - 1) * 0.5 + offset) + 'px';
            } else {
                this.animate = $(this.dragDom).animate({
                    width: containerWidth * this.timeline["dragWidth"] + 'px',
                    left: -(containerWidth * (this.timeline["dragWidth"] - 1) * 0.5 + offset) + 'px'
                },500);
            }








        }

    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        this.dragging = true;
        this.mouseOldX = event.pageX;
        this.mouseOldY = event.pageY;
    }

    @HostListener('document:mouseup')
    onMouseup() {
        this.dragging = false;
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event) {
        if (this.dragging == true) {
            let dom = this.ele.nativeElement;
            let oldX = parseInt(dom.style.left.toString());
            let oldY = parseInt(dom.style.top.toString());
            let disX = event.pageX - this.mouseOldX;
            let disY = event.pageY - this.mouseOldY;
            this.mouseOldX = event.pageX;
            this.mouseOldY = event.pageY;
            dom.style.left = oldX + disX + 'px';
        }

    }

}