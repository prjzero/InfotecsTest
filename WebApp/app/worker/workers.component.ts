import { Component } from '@angular/core';
import { WorkerService } from './worker.service';
import { Worker } from './worker';

@Component({
    selector: 'workers-app',
    template: `<table class="table table-condensed" id="workerTable">
    <thead>
    <tr>
        <th>#</th>
        <th>Имя</th>
        <th>Зарплата</th>
        <th>Специальность</th>
        <th>
            <button type="button" class="btn btn-info" id="addNewWorkerBtn" (click)="addNew()">Добавить</button>
        </th>
    </tr>
    </thead>
    <tbody>
        <tr *ngFor="let worker of workers; let i = index" [attr.workerid]="worker.workerId">
                    <td>{{i+1}}</td>
                    <td class="workerName">{{worker.workerName}}</td>
                    <td class="cost">{{worker.cost}}</td>
                    <td class="specialty">{{worker.specialty}}</td>
                    <td>
                        <button type="button" class="btn btn-info editWorker" (click)="editWorker(worker)">Редактировать</button>
                        <button type="button" class="btn btn-danger deleteWorker" (click)="deleteWorker(worker.workerId)">Удалить</button>
                    </td>
        </tr>
    </tbody>
    <tfoot *ngIf="isEditing">
    <tr>
        <td><input type="hidden" id="workerIdValue" value=""></td>
        <td>
            <div class="col-xs-12 left">
                <input type="text" class="form-control" id="WorkerNameEdit" [(ngModel)]="iWorker.workerName" placeholder="Имя...">
            </div>
        </td>
        <td>
            <div class="col-xs-8 left">
                <input type="text" class="form-control" id="CostEdit" [(ngModel)]="iWorker.cost" placeholder="Зарплата...">
            </div>
        </td>
        <td>
            <div class="col-xs-10 left">
                <input type="text" class="form-control" id="SpecialtyEdit" [(ngModel)]="iWorker.specialty" placeholder="Специальность...">
            </div>
        </td>
        <td>
            <button type="button" class="btn btn-success" id="updateBtn" (click)="updateItem()">Сохранить</button>
            <button type="button" class="btn btn-default" id="cancelUpdateBtn" (click)="clearItem()">Отменить</button>
        </td>
    </tr>
    </tfoot>
</table>`,
    providers: [WorkerService]
})
export class WorkersComponent {
    iWorker: Worker;
    isEditing: boolean = false;
    workers : Worker[];
    constructor(private workerService: WorkerService) {
        this.getAllWorkers();
    }

    getAllWorkers() {
        this.workerService.getWorkers()
            .subscribe((data) => { this.workers = data; }, (error) => { console.error(error); });
    }
    addNew() {
        this.isEditing = true;
        this.iWorker = new Worker;
    }
    editWorker(worker: Worker) {
        this.isEditing = true;
        this.iWorker = worker;
        this.getAllWorkers();
    }
    deleteWorker(workerId: string) {
        this.workerService.deleteWorker(workerId).subscribe((data) => { this.notifyResult(data, () => { this.getAllWorkers(); });  }, (error) => { console.error(error); });
        //this.getAllWorkers();
    }
    updateItem() {
        if (this.isEditing) {
            this.workerService.updateWorker(this.iWorker)
                .subscribe((data) => { this.notifyResult(data, () => { this.getAllWorkers(); this.clearItem(); });  }, (error) => { console.error(error); });
        }
    }
    clearItem() {
        this.isEditing = false;
        this.iWorker = new Worker;
    }
    notifyResult(data: any, func: () => void) {
        if (data.Status !== 'OK')
            alert(data.Message);
        else
            func();
    }
}