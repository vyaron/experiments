import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from "rxjs/Rx";

import {CanComponentDeactivate} from "../shared/index";
import {AddFormComponent} from "./add-form.component";

@Component({
    moduleId: module.id,
    directives: [AddFormComponent],
    templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit, CanComponentDeactivate {
    @ViewChild(AddFormComponent) addForm: AddFormComponent;

    constructor() { }

    ngOnInit() { }

    canDeactivate(): Observable<boolean> {
        return this.addForm.canDeactivate();
    }
}