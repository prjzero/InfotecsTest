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
var worker_service_1 = require("./worker.service");
var worker_1 = require("./worker");
var WorkersComponent = (function () {
    function WorkersComponent(workerService) {
        this.workerService = workerService;
        this.isEditing = false;
        this.getAllWorkers();
    }
    WorkersComponent.prototype.getAllWorkers = function () {
        var _this = this;
        this.workerService.getWorkers()
            .subscribe(function (data) { _this.workers = data; }, function (error) { console.error(error); });
    };
    WorkersComponent.prototype.addNew = function () {
        this.isEditing = true;
        this.iWorker = new worker_1.Worker;
    };
    WorkersComponent.prototype.editWorker = function (worker) {
        this.isEditing = true;
        this.iWorker = worker;
        this.getAllWorkers();
    };
    WorkersComponent.prototype.deleteWorker = function (workerId) {
        var _this = this;
        this.workerService.deleteWorker(workerId).subscribe(function (data) { _this.notifyResult(data, function () { _this.getAllWorkers(); }); }, function (error) { console.error(error); });
        //this.getAllWorkers();
    };
    WorkersComponent.prototype.updateItem = function () {
        var _this = this;
        if (this.isEditing) {
            this.workerService.updateWorker(this.iWorker)
                .subscribe(function (data) { _this.notifyResult(data, function () { _this.getAllWorkers(); _this.clearItem(); }); }, function (error) { console.error(error); });
        }
    };
    WorkersComponent.prototype.clearItem = function () {
        this.isEditing = false;
        this.iWorker = new worker_1.Worker;
    };
    WorkersComponent.prototype.notifyResult = function (data, func) {
        if (data.Status !== 'OK')
            alert(data.Message);
        else
            func();
    };
    return WorkersComponent;
}());
WorkersComponent = __decorate([
    core_1.Component({
        selector: 'workers-app',
        template: "<table class=\"table table-condensed\" id=\"workerTable\">\n    <thead>\n    <tr>\n        <th>#</th>\n        <th>\u0418\u043C\u044F</th>\n        <th>\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430</th>\n        <th>\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C</th>\n        <th>\n            <button type=\"button\" class=\"btn btn-info\" id=\"addNewWorkerBtn\" (click)=\"addNew()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n        </th>\n    </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let worker of workers; let i = index\" [attr.workerid]=\"worker.workerId\">\n                    <td>{{i+1}}</td>\n                    <td class=\"workerName\">{{worker.workerName}}</td>\n                    <td class=\"cost\">{{worker.cost}}</td>\n                    <td class=\"specialty\">{{worker.specialty}}</td>\n                    <td>\n                        <button type=\"button\" class=\"btn btn-info editWorker\" (click)=\"editWorker(worker)\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n                        <button type=\"button\" class=\"btn btn-danger deleteWorker\" (click)=\"deleteWorker(worker.workerId)\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n                    </td>\n        </tr>\n    </tbody>\n    <tfoot *ngIf=\"isEditing\">\n    <tr>\n        <td><input type=\"hidden\" id=\"workerIdValue\" value=\"\"></td>\n        <td>\n            <div class=\"col-xs-12 left\">\n                <input type=\"text\" class=\"form-control\" id=\"WorkerNameEdit\" [(ngModel)]=\"iWorker.workerName\" placeholder=\"\u0418\u043C\u044F...\">\n            </div>\n        </td>\n        <td>\n            <div class=\"col-xs-8 left\">\n                <input type=\"text\" class=\"form-control\" id=\"CostEdit\" [(ngModel)]=\"iWorker.cost\" placeholder=\"\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430...\">\n            </div>\n        </td>\n        <td>\n            <div class=\"col-xs-10 left\">\n                <input type=\"text\" class=\"form-control\" id=\"SpecialtyEdit\" [(ngModel)]=\"iWorker.specialty\" placeholder=\"\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C...\">\n            </div>\n        </td>\n        <td>\n            <button type=\"button\" class=\"btn btn-success\" id=\"updateBtn\" (click)=\"updateItem()\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n            <button type=\"button\" class=\"btn btn-default\" id=\"cancelUpdateBtn\" (click)=\"clearItem()\">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button>\n        </td>\n    </tr>\n    </tfoot>\n</table>",
        providers: [worker_service_1.WorkerService]
    }),
    __metadata("design:paramtypes", [worker_service_1.WorkerService])
], WorkersComponent);
exports.WorkersComponent = WorkersComponent;
//# sourceMappingURL=workers.component.js.map