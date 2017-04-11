import { Component } from '@angular/core';
import { WorkerShiftService } from './workerShift.service';
import { WorkerShift } from './workerShift';
import { Worker } from '../worker/worker';
import { WorkerObject } from '../workerObject/workerObject';
import { MultiselectDropdownModule, IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts  } from 'angular-2-dropdown-multiselect';

declare var $: JQueryStatic;
@Component({
    selector: 'workers-app',
    template: `<table class="table table-condensed" id="shiftTable">
    <thead>
    <tr>
        <th>#</th>
        <th>Объект</th>
        <th>Список рабочих</th>
        <th>Дата</th>
        <th>
            <button type="button" class="btn btn-info" id="addNewShiftBtn" (click)="addNew()">Добавить</button>
        </th>
    </tr>
    </thead>
    <tbody>
         <tr  *ngFor="let workerShift of workerShifts; let i = index" [attr.shiftid]="workerShift.shiftId">
            <td>{{i+1}}</td>
            <td class="workerObject" worlerobjectid="workerShift.WorkerObject.WorkerObjectId">{{workerShift.workerObject.address}}</td>
            <td class="workers">
               {{getShiftWorkersString(workerShift.shiftWorkers)}}
            </td>
            <td class="shiftDate">{{workerShift.shiftDate | date:"dd.MM.yyyy"}}</td>
            <td>
                <button type="button" class="btn btn-info editShift" (click)="editWorkerShift(workerShift)">Редактировать</button>
                <button type="button" class="btn btn-danger deleteShift" (click)="deleteWorkerShift(workerShift.shiftId)">Удалить</button>
            </td>
        </tr>
    </tbody>
    <tfoot *ngIf="isEditing">
    <tr>
        <td><input type="hidden" id="workerIdValue" value=""></td>
        <td>
            <div class="col-xs-12 left">
                <!--input type="text" class="form-control" id="WorkerNameEdit" [(ngModel)]="iWorker.workerName" placeholder="Имя..." -->
                <!--<select class="selectpicker" id="workerObjectSelect" [(ngModel)]="iWorkerShift.workerObject.address">
                    <option *ngFor="let wo of allWorkerObjects" [ngValue]="wo.workerObjectId">{{wo.address}}</option>
                </select>-->
                <ss-multiselect-dropdown [options]="workerObjectSelectOptions" [texts]="workerObjectSelectTexts" [settings]="workerObjectSelectSettings" [(ngModel)]="workerObjectSelectModel"></ss-multiselect-dropdown>
            </div>
        </td>
        <td>
            <div class="col-xs-8 left">
                <!--input type="text" class="form-control" id="CostEdit" [(ngModel)]="iWorker.cost" placeholder="Зарплата..."-->
                <!--<select class="selectpicker" id="workersSelect"  [(ngModel)]="iWorkerShift.workerObject.address" multiple>
                    <option *ngFor="let w of allWorkers" [ngValue]="w.workerId">{{w.workerName}}</option>
                </select>-->
                <ss-multiselect-dropdown [options]="workerSelectOptions" [texts]="workerSelectTexts" [settings]="workerSelectSettings" [(ngModel)]="workerSelectModel"></ss-multiselect-dropdown>
            </div>
        </td>
        <td>
            <div class="col-xs-10 left">
              <!-- <input type="text" class="form-control" id="shiftDateEdit"  type="date" [value]="getDateFromString(iWorkerShift.shiftDate)" placeholder="Дата..."> -->
            <input class="form-control" [ngModel]="iWorkerShift.shiftDate | date:'yyyy-MM-dd'" (ngModelChange)="iWorkerShift.shiftDate = $event" type="date" name="iWorkerShift.shiftDate" placeholder="Дата..."/>
            </div>
        </td>
        <td>
            <button type="button" class="btn btn-success" id="updateBtn" (click)="updateItem()">Сохранить</button>
            <button type="button" class="btn btn-default" id="cancelUpdateBtn" (click)="clearItem()">Отменить</button>
        </td>
    </tr>
    </tfoot>
</table>`,
    providers: [WorkerShiftService]
})
export class WorkerShiftComponent {
    workerSelectModel: string[];
    workerSelectOptions: IMultiSelectOption[] = [];
    workerSelectSettings: IMultiSelectSettings = {
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
    workerSelectTexts: IMultiSelectTexts = {
        checkAll: 'Выбрать все',
        uncheckAll: 'Снять все',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Поиск...',
        defaultTitle: 'Список рабочих',
        allSelected: 'Выбраны все',
    };
    workerObjectSelectModel: string[];
    workerObjectSelectOptions: IMultiSelectOption[] = [];
    workerObjectSelectSettings: IMultiSelectSettings = {
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
    workerObjectSelectTexts: IMultiSelectTexts = {
        checkAll: 'Выбрать все',
        uncheckAll: 'Снять все',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Поиск...',
        defaultTitle: 'Объекты',
        allSelected: 'Выбраны все',
    };

    iWorkerShift: WorkerShift;
    isEditing: boolean = false;
    workerShifts: WorkerShift[];
    allWorkers: Worker[];
    allWorkerObjects: WorkerObject[];
    constructor(private workerShiftService: WorkerShiftService) {
        this.getAllWorkerShifts();
    }

    getAllWorkerShifts() {
        this.workerShiftService.getWorkerShifts()
            .subscribe((data) => {
            this.workerShifts = data.shifts;
                this.allWorkers = data.workers;
                this.allWorkerObjects = data.workerObjects;
            }, (error) => { console.error(error); });
    }
    addNew() {
        this.isEditing = true;
        this.iWorkerShift = new WorkerShift;
        this.workerObjectSelectOptions = [];
        for (let wo of this.allWorkerObjects) {
            this.workerObjectSelectOptions.push({id: wo.workerObjectId, name: wo.address});
        }
        this.workerSelectOptions = [];
        for (let w of this.allWorkers) {
            this.workerSelectOptions.push({ id: w.workerId, name: w.workerName });
        }
    }
    editWorkerShift(workerShift: WorkerShift) {
        this.isEditing = true;
        this.iWorkerShift = workerShift;
        this.workerObjectSelectOptions = [];
        this.workerSelectOptions = [];
        for (let wo of this.allWorkerObjects) {
            this.workerObjectSelectOptions.push({ id: wo.workerObjectId, name: wo.address });
        }
        this.workerSelectOptions = [];
        for (let w of this.allWorkers) {
            this.workerSelectOptions.push({ id: w.workerId, name: w.workerName });
        }
        this.workerSelectModel = [];
        for (let sw of workerShift.shiftWorkers) {
            this.workerSelectModel.push(sw.workerId);
        }
        this.workerObjectSelectModel = [];
        if (workerShift.workerObject) {
            this.workerObjectSelectModel.push(workerShift.workerObject.workerObjectId)
        }
        this.getAllWorkerShifts();
    }
    deleteWorkerShift(workerShiftId: string) {
        this.workerShiftService.deleteWorkerShift(workerShiftId).subscribe((data) => { this.notifyResult(data, () => { this.getAllWorkerShifts(); }); }, (error) => { console.error(error); });
        //this.getAllWorkers();
    }
    updateItem() {
        if (this.isEditing) {
            this.workerShiftService.updateWorkerShift(this.iWorkerShift.shiftId, this.workerObjectSelectModel[0], this.workerSelectModel, this.iWorkerShift.shiftDate)
                .subscribe((data) => { this.notifyResult(data, () => { this.getAllWorkerShifts(); this.clearItem(); }); }, (error) => { console.error(error); } );
        }
    }
    clearItem() {
        this.isEditing = false;
        this.iWorkerShift = new WorkerShift;
    }
    getShiftWorkersString(shiftWorkers: Worker[]) {
        return shiftWorkers.map(o => o.workerName).join(', ');
    }
    notifyResult(data: any, func: () => void) {
        if (data.Status !== 'OK')
            alert(data.Message);
        else
            func();
    }
}
    
