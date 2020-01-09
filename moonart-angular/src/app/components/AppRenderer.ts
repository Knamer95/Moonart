import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<button #myButton></button>'
})
export class AppComponent{
  @ViewChild("myButton") myButton: ElementRef;

  constructor(private renderer: Renderer2) { }

  addMyClass(){
    //this.myButton.nativeElement.classList.add("my-class"); //BAD PRACTICE
    this.renderer.addClass(this.myButton.nativeElement, "my-class");
  }

  removeMyClass(){
    //this.myButton.nativeElement.classList.remove("my-class"); //BAD PRACTICE
    this.renderer.removeClass(this.myButton.nativeElement, "my-class");
  }

}