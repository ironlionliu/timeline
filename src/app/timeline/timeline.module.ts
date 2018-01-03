import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TimelineComponent } from './timeline.component';
import {TimelineDirectiveModule} from '../directives/timelineDriective.module';

@NgModule({
    declarations: [TimelineComponent],
    imports:[TimelineDirectiveModule,CommonModule],
    exports:[TimelineComponent]
})
export class TimelineModule {
    constructor(){
    }
 }