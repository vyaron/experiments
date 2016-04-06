import {Directive, ElementRef, EventEmitter, Output, OnInit} from "angular2/core";

@Directive({
    selector: "[myHeight]",
    host: {
		'(window:resize)': 'onResize($event)',
	},
})
export class HeightDirective implements OnInit {
    @Output() resize = new EventEmitter<number>(false);
        
    constructor(
        private el: ElementRef
    ) {
    }
    
    ngOnInit() {
        this.onResize(null);
    }
    
    private onResize(e: any) {
        let height = this.el.nativeElement.clientHeight;
        
        // console.log("Element height", this.el.nativeElement.clientHeight);
        
        this.resize.emit(height);
    }
}