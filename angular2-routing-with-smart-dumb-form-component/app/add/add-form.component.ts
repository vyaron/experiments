import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {Observable} from "rxjs/Rx";

import {CanComponentDeactivate, DialogService} from "../shared/index";
import {Entity} from "./entity.model";

@Component({
    moduleId: module.id,
    selector: 'add-form',
    directives: [REACTIVE_FORM_DIRECTIVES],
    templateUrl: 'add-form.component.html'
})
export class AddFormComponent implements OnInit, CanComponentDeactivate {
    @Input() entity: Entity;

    addForm: FormGroup;

    constructor(
        private dialogService: DialogService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            stringValue: [undefined, Validators.required],
            numberValue: [undefined, Validators.required]
        });
    }

    canDeactivate(): boolean | Observable<boolean> {
        if (this.addForm.pristine) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        let p = this.dialogService.confirm('Discard changes?');
        let o = Observable.fromPromise(p);
        return o;
    }
}