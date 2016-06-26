import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import {FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {Observable} from "rxjs/Rx";

import {CanComponentDeactivate, DialogService} from "../index";
import {Entity} from "../index";

@Component({
    moduleId: module.id,
    selector: 'entity-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [REACTIVE_FORM_DIRECTIVES],
    templateUrl: 'entity-form.component.html'
})
export class EntityFormComponent implements OnInit, CanComponentDeactivate {
    @Input() entity: Entity;
    @Output() reset = new EventEmitter<any>(false);
    @Output() save = new EventEmitter<Entity>(false);

    entityForm: FormGroup;

    active = true;

    constructor(
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        console.log("Changes in EntityForm - rebuilding form", this.entity);

        this.buildForm();

        /// W....T....F....???
        //  work around the issue where Angular doesn't provide a way
        //  to actually reset a form. We need to rebuild it and get it 
        //  to be re-created in the DOM.
        //
        // Using setTimeout will also run the callback outside of Angular's 
        //  change detection, since we're using OnPush, so we need to mark 
        //  this component to be checked for changes manually.
        //
        this.active = false;
        setTimeout(() => {
            this.active = true;
            this.changeDetectorRef.markForCheck();
        }, 0);
    }

    buildForm() {
        this.entityForm = this.formBuilder.group({
            stringValue: [this.entity.stringValue, Validators.required],
            numberValue: [this.entity.numberValue, Validators.required]
        });
    }

    submit(): void {
        let entityToSave = new Entity();
        entityToSave.stringValue = this.entityForm.controls["stringValue"].value;
        entityToSave.numberValue = this.entityForm.controls["numberValue"].value;

        this.save.emit(entityToSave);
    }

    canDeactivate(): boolean | Observable<boolean> {
        if (this.entityForm.pristine) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        let p = this.dialogService.confirm('Discard changes?');
        let o = Observable.fromPromise(p);
        return o;
    }
}