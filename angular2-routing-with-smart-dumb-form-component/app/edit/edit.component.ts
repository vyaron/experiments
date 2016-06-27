import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from "rxjs/Rx";

import {CanComponentDeactivate} from "../shared/index";
import {EntityFormComponent, Entity} from "../shared/index";

@Component({
    moduleId: module.id,
    directives: [EntityFormComponent],
    templateUrl: 'edit.component.html',
    styleUrls: ["edit.component.css"]
})
export class EditComponent implements OnInit, CanComponentDeactivate {
    entity: Entity;
    @ViewChild(EntityFormComponent) entityForm: EntityFormComponent;

    constructor() {
        this.entity = new Entity();
     }

    ngOnInit() { }

    resetEntity(): void {
        console.log("resetting entity");
        this.entity = new Entity();
    }

    saveEntity(entityToSave: Entity): void {
        console.log("saving entity", entityToSave);

       this.resetEntity();
    }

    canDeactivate(): boolean | Observable<boolean> {
        return this.entityForm.canDeactivate();
    }
}