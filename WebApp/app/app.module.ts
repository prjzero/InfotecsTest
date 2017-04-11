import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WorkersComponent } from './worker/workers.component';
import { WorkerObjectComponent } from './workerObject/workerObject.component';
import { WorkerShiftComponent } from './workerShift/workerShift.component';
import { MultiselectDropdownModule, IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

import { HttpModule } from '@angular/http';

// определение маршрутов
const appRoutes: Routes = [
    //{ path: '', component: AppComponent },
    { path: 'AngularWorker/Index', component: AppComponent },
    { path: 'AngularWorker/Workers', component: WorkersComponent },
    { path: 'AngularWorker/WorkerObjects', component: WorkerObjectComponent },
    { path: 'AngularWorker/WorkerShifts', component: WorkerShiftComponent }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes), MultiselectDropdownModule],
    declarations: [AppComponent, WorkersComponent, WorkerObjectComponent, WorkerShiftComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }