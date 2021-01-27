// Not in use

import { Component, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery: any;

@Component({
})

export class BootstrapComponent implements AfterViewInit {
    public constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        jQuery(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();
    }
}

