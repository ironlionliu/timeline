import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import * as $ from 'jquery';
@Directive({
    selector: '[timeline-test]',
})
export class TestDirective {
    constructor(
        private ele: ElementRef
    ) {
        console.log("testdirective");
    }
    @Input() testData;

    @Input('test')
    set Test(test) {
        console.log(test);
        this.setPosition();
    }

    private setPosition(){
        console.log(this.testData);
    }
}