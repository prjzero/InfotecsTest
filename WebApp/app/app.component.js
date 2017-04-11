"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<div>\n                    <h2>\u0413\u043B\u0430\u0432\u043D\u0430\u044F</h2>\n                    <p>\n                    <a class=\"btn btn-lg btn-default\" routerLink=\"AngularWorker/Workers\" routerLinkActive=\"active\">\u0420\u0430\u0431\u043E\u0447\u0438\u0435</a>\n                    <a class=\"btn btn-lg btn-default\" routerLink=\"AngularWorker/WorkerObjects\" routerLinkActive=\"active\">\u041E\u0431\u044A\u0435\u043A\u0442\u044B</a>\n                    <a class=\"btn btn-lg btn-default\" routerLink=\"AngularWorker/WorkerShifts\" routerLinkActive=\"active\">\u0421\u043C\u0435\u043D\u044B</a>\n                    </p>\n                    <router-outlet></router-outlet>\n               </div>"
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map