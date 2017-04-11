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
var workerShift_service_1 = require("./workerShift.service");
var workerShift_1 = require("./workerShift");
var WorkerShiftComponent = (function () {
    function WorkerShiftComponent(workerShiftService) {
        this.workerShiftService = workerShiftService;
        this.workerSelectOptions = [];
        this.workerSelectSettings = {
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default btn-secondary',
            selectionLimit: 0,
            closeOnSelect: false,
            autoUnselect: false,
            showCheckAll: false,
            showUncheckAll: false,
            fixedTitle: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '300px',
        };
        this.workerSelectTexts = {
            checkAll: 'Выбрать все',
            uncheckAll: 'Снять все',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Поиск...',
            defaultTitle: 'Список рабочих',
            allSelected: 'Выбраны все',
        };
        this.workerObjectSelectOptions = [];
        this.workerObjectSelectSettings = {
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default btn-secondary',
            selectionLimit: 1,
            closeOnSelect: true,
            autoUnselect: true,
            showCheckAll: false,
            showUncheckAll: false,
            fixedTitle: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '300px',
        };
        this.workerObjectSelectTexts = {
            checkAll: 'Выбрать все',
            uncheckAll: 'Снять все',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Поиск...',
            defaultTitle: 'Объекты',
            allSelected: 'Выбраны все',
        };
        this.isEditing = false;
        this.getAllWorkerShifts();
    }
    WorkerShiftComponent.prototype.getAllWorkerShifts = function () {
        var _this = this;
        this.workerShiftService.getWorkerShifts()
            .subscribe(function (data) {
            _this.workerShifts = data.shifts;
            _this.allWorkers = data.workers;
            _this.allWorkerObjects = data.workerObjects;
        }, function (error) { console.error(error); });
    };
    WorkerShiftComponent.prototype.addNew = function () {
        this.isEditing = true;
        this.iWorkerShift = new workerShift_1.WorkerShift;
        this.workerObjectSelectOptions = [];
        for (var _i = 0, _a = this.allWorkerObjects; _i < _a.length; _i++) {
            var wo = _a[_i];
            this.workerObjectSelectOptions.push({ id: wo.workerObjectId, name: wo.address });
        }
        this.workerSelectOptions = [];
        for (var _b = 0, _c = this.allWorkers; _b < _c.length; _b++) {
            var w = _c[_b];
            this.workerSelectOptions.push({ id: w.workerId, name: w.workerName });
        }
    };
    WorkerShiftComponent.prototype.editWorkerShift = function (workerShift) {
        this.isEditing = true;
        this.iWorkerShift = workerShift;
        this.workerObjectSelectOptions = [];
        this.workerSelectOptions = [];
        for (var _i = 0, _a = this.allWorkerObjects; _i < _a.length; _i++) {
            var wo = _a[_i];
            this.workerObjectSelectOptions.push({ id: wo.workerObjectId, name: wo.address });
        }
        this.workerSelectOptions = [];
        for (var _b = 0, _c = this.allWorkers; _b < _c.length; _b++) {
            var w = _c[_b];
            this.workerSelectOptions.push({ id: w.workerId, name: w.workerName });
        }
        this.workerSelectModel = [];
        for (var _d = 0, _e = workerShift.shiftWorkers; _d < _e.length; _d++) {
            var sw = _e[_d];
            this.workerSelectModel.push(sw.workerId);
        }
        this.workerObjectSelectModel = [];
        if (workerShift.workerObject) {
            this.workerObjectSelectModel.push(workerShift.workerObject.workerObjectId);
        }
        this.getAllWorkerShifts();
    };
    WorkerShiftComponent.prototype.deleteWorkerShift = function (workerShiftId) {
        var _this = this;
        this.workerShiftService.deleteWorkerShift(workerShiftId).subscribe(function (data) { _this.notifyResult(data, function () { _this.getAllWorkerShifts(); }); }, function (error) { console.error(error); });
        //this.getAllWorkers();
    };
    WorkerShiftComponent.prototype.updateItem = function () {
        var _this = this;
        if (this.isEditing) {
            this.workerShiftService.updateWorkerShift(this.iWorkerShift.shiftId, this.workerObjectSelectModel[0], this.workerSelectModel, this.iWorkerShift.shiftDate)
                .subscribe(function (data) { _this.notifyResult(data, function () { _this.getAllWorkerShifts(); _this.clearItem(); }); }, function (error) { console.error(error); });
        }
    };
    WorkerShiftComponent.prototype.clearItem = function () {
        this.isEditing = false;
        this.iWorkerShift = new workerShift_1.WorkerShift;
    };
    WorkerShiftComponent.prototype.getShiftWorkersString = function (shiftWorkers) {
        return shiftWorkers.map(function (o) { return o.workerName; }).join(', ');
    };
    WorkerShiftComponent.prototype.notifyResult = function (data, func) {
        if (data.Status !== 'OK')
            alert(data.Message);
        else
            func();
    };
    return WorkerShiftComponent;
}());
WorkerShiftComponent = __decorate([
    core_1.Component({
        selector: 'workers-app',
        template: "<table class=\"table table-condensed\" id=\"shiftTable\">\n    <thead>\n    <tr>\n        <th>#</th>\n        <th>\u041E\u0431\u044A\u0435\u043A\u0442</th>\n        <th>\u0421\u043F\u0438\u0441\u043E\u043A \u0440\u0430\u0431\u043E\u0447\u0438\u0445</th>\n        <th>\u0414\u0430\u0442\u0430</th>\n        <th>\n            <button type=\"button\" class=\"btn btn-info\" id=\"addNewShiftBtn\" (click)=\"addNew()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n        </th>\n    </tr>\n    </thead>\n    <tbody>\n         <tr  *ngFor=\"let workerShift of workerShifts; let i = index\" [attr.shiftid]=\"workerShift.shiftId\">\n            <td>{{i+1}}</td>\n            <td class=\"workerObject\" worlerobjectid=\"workerShift.WorkerObject.WorkerObjectId\">{{workerShift.workerObject.address}}</td>\n            <td class=\"workers\">\n               {{getShiftWorkersString(workerShift.shiftWorkers)}}\n            </td>\n            <td class=\"shiftDate\">{{workerShift.shiftDate | date:\"dd.MM.yyyy\"}}</td>\n            <td>\n                <button type=\"button\" class=\"btn btn-info editShift\" (click)=\"editWorkerShift(workerShift)\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n                <button type=\"button\" class=\"btn btn-danger deleteShift\" (click)=\"deleteWorkerShift(workerShift.shiftId)\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n            </td>\n        </tr>\n    </tbody>\n    <tfoot *ngIf=\"isEditing\">\n    <tr>\n        <td><input type=\"hidden\" id=\"workerIdValue\" value=\"\"></td>\n        <td>\n            <div class=\"col-xs-12 left\">\n                <!--input type=\"text\" class=\"form-control\" id=\"WorkerNameEdit\" [(ngModel)]=\"iWorker.workerName\" placeholder=\"\u0418\u043C\u044F...\" -->\n                <!--<select class=\"selectpicker\" id=\"workerObjectSelect\" [(ngModel)]=\"iWorkerShift.workerObject.address\">\n                    <option *ngFor=\"let wo of allWorkerObjects\" [ngValue]=\"wo.workerObjectId\">{{wo.address}}</option>\n                </select>-->\n                <ss-multiselect-dropdown [options]=\"workerObjectSelectOptions\" [texts]=\"workerObjectSelectTexts\" [settings]=\"workerObjectSelectSettings\" [(ngModel)]=\"workerObjectSelectModel\"></ss-multiselect-dropdown>\n            </div>\n        </td>\n        <td>\n            <div class=\"col-xs-8 left\">\n                <!--input type=\"text\" class=\"form-control\" id=\"CostEdit\" [(ngModel)]=\"iWorker.cost\" placeholder=\"\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430...\"-->\n                <!--<select class=\"selectpicker\" id=\"workersSelect\"  [(ngModel)]=\"iWorkerShift.workerObject.address\" multiple>\n                    <option *ngFor=\"let w of allWorkers\" [ngValue]=\"w.workerId\">{{w.workerName}}</option>\n                </select>-->\n                <ss-multiselect-dropdown [options]=\"workerSelectOptions\" [texts]=\"workerSelectTexts\" [settings]=\"workerSelectSettings\" [(ngModel)]=\"workerSelectModel\"></ss-multiselect-dropdown>\n            </div>\n        </td>\n        <td>\n            <div class=\"col-xs-10 left\">\n              <!-- <input type=\"text\" class=\"form-control\" id=\"shiftDateEdit\"  type=\"date\" [value]=\"getDateFromString(iWorkerShift.shiftDate)\" placeholder=\"\u0414\u0430\u0442\u0430...\"> -->\n            <input class=\"form-control\" [ngModel]=\"iWorkerShift.shiftDate | date:'yyyy-MM-dd'\" (ngModelChange)=\"iWorkerShift.shiftDate = $event\" type=\"date\" name=\"iWorkerShift.shiftDate\" placeholder=\"\u0414\u0430\u0442\u0430...\"/>\n            </div>\n        </td>\n        <td>\n            <button type=\"button\" class=\"btn btn-success\" id=\"updateBtn\" (click)=\"updateItem()\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n            <button type=\"button\" class=\"btn btn-default\" id=\"cancelUpdateBtn\" (click)=\"clearItem()\">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button>\n        </td>\n    </tr>\n    </tfoot>\n</table>",
        providers: [workerShift_service_1.WorkerShiftService]
    }),
    __metadata("design:paramtypes", [workerShift_service_1.WorkerShiftService])
], WorkerShiftComponent);
exports.WorkerShiftComponent = WorkerShiftComponent;
//# sourceMappingURL=workerShift.component.js.map