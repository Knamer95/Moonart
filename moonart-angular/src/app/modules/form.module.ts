import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from '../app.component';
import { ImageComponent } from '../components/image/image.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ImageComponent
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class FormModule { }