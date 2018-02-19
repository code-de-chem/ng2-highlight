import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    HighlightDirective
  ],
  exports: [
    HighlightDirective
  ],
  providers: [],
  bootstrap: []
})
export class HighlightModule { }
