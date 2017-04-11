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
var WorkerService = (function () {
    function WorkerService(http) {
        this.http = http;
    }
    WorkerService.prototype.getWorkers = function () {
        return this.http.get('/AngularWorker/GetWorkers')
            .map(function (resp) {
            var workersList = resp.json();
            var workers = [];
            for (var index in workersList) {
                console.log(workersList[index]);
                var worker = workersList[index];
                workers.push({
                    workerId: worker.workerId,
                    workerName: worker.workerName,
                    cost: worker.cost,
                    specialty: worker.specialty
                });
            }
            return workers;
        }).catch(function (error) { return Observable_1.Observable.throw(error); });
        ;
    };
    WorkerService.prototype.updateWorker = function (obj) {
        var body = JSON.stringify({ "worker": obj });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/AngularWorker/UpdateWorker', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    WorkerService.prototype.deleteWorker = function (obj) {
        var body = JSON.stringify({ "workerId": obj });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/AngularWorker/DeleteWorker', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    return WorkerService;
}());
WorkerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WorkerService);
exports.WorkerService = WorkerService;
//# sourceMappingURL=worker.service.js.map