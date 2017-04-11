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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var WorkerShiftService = (function () {
    function WorkerShiftService(http) {
        this.http = http;
    }
    WorkerShiftService.prototype.getWorkerShifts = function () {
        return this.http.get('/AngularWorker/GetWorkerShifts')
            .map(function (resp) {
            var WorkerShiftList = resp.json();
            //let workers: Worker[] = [];
            //for (let index in workersList) {
            //    console.log(workersList[index]);
            //    let worker = workersList[index];
            //    workers.push({
            //        workerId: worker.workerId,
            //        workerName: worker.workerName,
            //        cost: worker.cost,
            //        specialty: worker.specialty});
            //}
            return WorkerShiftList;
        }).catch(function (error) { return Observable_1.Observable.throw(error); });
        ;
    };
    WorkerShiftService.prototype.updateWorkerShift = function (shiftId, workerObjectId, workers, shiftDate) {
        var body = JSON.stringify({ "shiftId": shiftId, "workerObjectId": workerObjectId, "workers": workers, "shiftDate": shiftDate });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/AngularWorker/UpdateShift', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    WorkerShiftService.prototype.deleteWorkerShift = function (obj) {
        var body = JSON.stringify({ "shiftId": obj });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/AngularWorker/DeleteShift', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    return WorkerShiftService;
}());
WorkerShiftService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WorkerShiftService);
exports.WorkerShiftService = WorkerShiftService;
//# sourceMappingURL=workerShift.service.js.map