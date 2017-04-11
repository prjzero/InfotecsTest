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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var workerObject_service_1 = require("./workerObject.service");
var workerObject_1 = require("./workerObject");
var WorkerObjectComponent = (function () {
    function WorkerObjectComponent(workerObjectService) {
        this.workerObjectService = workerObjectService;
        this.isEditing = false;
        this.getAllWorkerObjects();
    }
    WorkerObjectComponent.prototype.getAllWorkerObjects = function () {
        var _this = this;
        this.workerObjectService.getWorkerObjects()
            .subscribe(function (data) { _this.workerObjects = data; }, function (error) { console.error(error); });
    };
    WorkerObjectComponent.prototype.addNew = function () {
        this.isEditing = true;
        this.iWorkerObject = new workerObject_1.WorkerObject;
    };
    WorkerObjectComponent.prototype.editWorkerObject = function (workerObject) {
        this.isEditing = true;
        this.iWorkerObject = workerObject;
        this.getAllWorkerObjects();
    };
    WorkerObjectComponent.prototype.deleteWorkerObject = function (workerObjectId) {
        var _this = this;
        this.workerObjectService.deleteWorkerObject(workerObjectId).subscribe(function (data) { _this.notifyResult(data, function () { _this.getAllWorkerObjects(); }); }, function (error) { console.error(error); });
    };
    WorkerObjectComponent.prototype.updateItem = function () {
        var _this = this;
        if (this.isEditing) {
            this.workerObjectService.updateWorkerObject(this.iWorkerObject)
                .subscribe(function (data) { _this.notifyResult(data, function () { _this.getAllWorkerObjects(); _this.clearItem(); }); }, function (error) { console.error(error); });
        }
    };
    WorkerObjectComponent.prototype.clearItem = function () {
        this.isEditing = false;
        this.iWorkerObject = new workerObject_1.WorkerObject;
    };
    WorkerObjectComponent.prototype.notifyResult = function (data, func) {
        if (data.Status !== 'OK')
            alert(data.Message);
        else
            func();
    };
    return WorkerObjectComponent;
}());
WorkerObjectComponent = __decorate([
    core_1.Component({
        selector: 'workerobjects-app',
        template: "<table class=\"table table-condensed\" id=\"workerObjectTable\">\n     <thead>\n        <tr>\n            <th>#</th>\n            <th>\u0410\u0434\u0440\u0435\u0441</th>\n            <th>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0445 \u0440\u0430\u0431\u043E\u0447\u0438\u0445</th>\n            <th>\n                <button type=\"button\" class=\"btn btn-info\" id=\"addNewWorkerObjectBtn\" (click)=\"addNew()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let workerObject of workerObjects; let i = index\" [attr.workerobjectid]=\"workerObject.workerobjectid\">\n\t\t\t\t<td>{{i+1}}</td>\n\t\t\t\t<td class=\"address\">{{workerObject.address}}</td>\n\t\t\t\t<td class=\"workerCount\">{{workerObject.workerCount}}</td>\n\t\t\t\t<td>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-info editWorkerObject\" (click)=\"editWorkerObject(workerObject)\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger deleteWorkerObject\" (click)=\"deleteWorkerObject(workerObject.workerObjectId)\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n\t\t\t\t</td>\n        </tr>\n    </tbody>\n    <tfoot *ngIf=\"isEditing\">\n    <tr>\n\t\t<td><input type=\"hidden\" id=\"workerObjectIdValue\" /></td>\n\t\t<td>\n\t\t\t<div class=\"col-xs-12 left\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"AddressEdit\" [(ngModel)]=\"iWorkerObject.address\" placeholder=\"\u0410\u0434\u0440\u0435\u0441...\">\n\t\t\t</div>\n\t\t</td>\n\t\t<td>\n\t\t\t<div class=\"col-xs-8 left\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"WorkerCountEdit\" [(ngModel)]=\"iWorkerObject.workerCount\" placeholder=\"\u041A\u043E\u043B-\u0432\u043E \u0440\u0430\u0431\u043E\u0447\u0438\u0445...\">\n\t\t\t</div>\n\t\t</td>\n\t\t<td>\n\t\t\t<button type=\"button\" class=\"btn btn-success\" id=\"updateBtn\" (click)=\"updateItem()\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t\t\t<button type=\"button\" class=\"btn btn-default\" id=\"cancelUpdateBtn\" (click)=\"clearItem()\">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button>\n\t\t</td>\n\t</tr>\n    </tfoot>\n</table>",
        providers: [workerObject_service_1.WorkerObjectService]
    }),
    __metadata("design:paramtypes", [workerObject_service_1.WorkerObjectService])
], WorkerObjectComponent);
exports.WorkerObjectComponent = WorkerObjectComponent;
//# sourceMappingURL=workerObject.component.js.map