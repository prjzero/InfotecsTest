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
var WorkerObjectService = (function () {
    function WorkerObjectService(http) {
        this.http = http;
    }
    WorkerObjectService.prototype.getWorkerObjects = function () {
        return this.http.get('/AngularWorker/GetWorkerObjects')
            .map(function (resp) {
            var workerObjectsList = resp.json();
            var workerObjects = [];
            for (var index in workerObjectsList) {
                console.log(workerObjectsList[index]);
                var workerObject = workerObjectsList[index];
                workerObjects.push({
                    workerObjectId: workerObject.workerObjectId,
                    address: workerObject.address,
                    workerCount: workerObject.workerCount
                });
            }
            return workerObjects;
        }).catch(function (error) { return Observable_1.Observable.throw(error); });
        ;
    };
    WorkerObjectService.prototype.updateWorkerObject = function (obj) {
        var body = JSON.stringify({ "workerObject": obj });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/AngularWorker/UpdateWorkerObject', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    WorkerObjectService.prototype.deleteWorkerObject = function (obj) {
        var body = JSON.stringify({ "workerObjectId": obj });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('/AngularWorker/DeleteWorkerObject', body, { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    return WorkerObjectService;
}());
WorkerObjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], WorkerObjectService);
exports.WorkerObjectService = WorkerObjectService;
//# sourceMappingURL=workerObject.service.js.map