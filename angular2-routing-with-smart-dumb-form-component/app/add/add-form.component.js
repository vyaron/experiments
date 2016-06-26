"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var Rx_1 = require("rxjs/Rx");
var index_1 = require("../shared/index");
var entity_model_1 = require("./entity.model");
var AddFormComponent = (function () {
    function AddFormComponent(dialogService, formBuilder) {
        this.dialogService = dialogService;
        this.formBuilder = formBuilder;
    }
    AddFormComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            stringValue: [undefined, forms_1.Validators.required],
            numberValue: [undefined, forms_1.Validators.required]
        });
    };
    AddFormComponent.prototype.canDeactivate = function () {
        if (this.addForm.pristine) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        var p = this.dialogService.confirm('Discard changes?');
        var o = Rx_1.Observable.fromPromise(p);
        return o;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', entity_model_1.Entity)
    ], AddFormComponent.prototype, "entity", void 0);
    AddFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-form',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
            templateUrl: 'add-form.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.DialogService, forms_1.FormBuilder])
    ], AddFormComponent);
    return AddFormComponent;
}());
exports.AddFormComponent = AddFormComponent;
