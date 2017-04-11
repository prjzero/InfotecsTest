"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var workers_component_1 = require("./worker/workers.component");
var workerObject_component_1 = require("./workerObject/workerObject.component");
var workerShift_component_1 = require("./workerShift/workerShift.component");
var angular_2_dropdown_multiselect_1 = require("angular-2-dropdown-multiselect");
var http_1 = require("@angular/http");
// ����������� ���������
var appRoutes = [
    //{ path: '', component: AppComponent },
    { path: 'AngularWorker/Index', component: app_component_1.AppComponent },
    { path: 'AngularWorker/Workers', component: workers_component_1.WorkersComponent },
    { path: 'AngularWorker/WorkerObjects', component: workerObject_component_1.WorkerObjectComponent },
    { path: 'AngularWorker/WorkerShifts', component: workerShift_component_1.WorkerShiftComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes), angular_2_dropdown_multiselect_1.MultiselectDropdownModule],
        declarations: [app_component_1.AppComponent, workers_component_1.WorkersComponent, workerObject_component_1.WorkerObjectComponent, workerShift_component_1.WorkerShiftComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map