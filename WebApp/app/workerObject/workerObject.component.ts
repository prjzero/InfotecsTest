import { Component } from '@angular/core';
import { WorkerObjectService } from './workerObject.service';
import { WorkerObject } from './workerObject';

@Component({
    selector: 'workerobjects-app',
    template: `<table class="table table-condensed" id="workerObjectTable">
     <thead>
        <tr>
            <th>#</th>
            <th>Адрес</th>
            <th>Количество требуемых рабочих</th>
            <th>
                <button type="button" class="btn btn-info" id="addNewWorkerObjectBtn" (click)="addNew()">Добавить</button>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let workerObject of workerObjects; let i = index" [attr.workerobjectid]="workerObject.workerobjectid">
				<td>{{i+1}}</td>
				<td class="address">{{workerObject.address}}</td>
				<td class="workerCount">{{workerObject.workerCount}}</td>
				<td>
					<button type="button" class="btn btn-info editWorkerObject" (click)="editWorkerObject(workerObject)">Редактировать</button>
					<button type="button" class="btn btn-danger deleteWorkerObject" (click)="deleteWorkerObject(workerObject.workerObjectId)">Удалить</button>
				</td>
        </tr>
    </tbody>
    <tfoot *ngIf="isEditing">
    <tr>
		<td><input type="hidden" id="workerObjectIdValue" /></td>
		<td>
			<div class="col-xs-12 left">
				<input type="text" class="form-control" id="AddressEdit" [(ngModel)]="iWorkerObject.address" placeholder="Адрес...">
			</div>
		</td>
		<td>
			<div class="col-xs-8 left">
				<input type="text" class="form-control" id="WorkerCountEdit" [(ngModel)]="iWorkerObject.workerCount" placeholder="Кол-во рабочих...">
			</div>
		</td>
		<td>
			<button type="button" class="btn btn-success" id="updateBtn" (click)="updateItem()">Сохранить</button>
			<button type="button" class="btn btn-default" id="cancelUpdateBtn" (click)="clearItem()">Отменить</button>
		</td>
	</tr>
    </tfoot>
</table>`,
    providers: [WorkerObjectService]
})
export class WorkerObjectComponent {
    iWorkerObject: WorkerObject;
    isEditing: boolean = false;
    workerObjects: WorkerObject[];
    constructor(private workerObjectService: WorkerObjectService) {
        this.getAllWorkerObjects();
    }

    getAllWorkerObjects() {
        this.workerObjectService.getWorkerObjects()
            .subscribe((data) => { this.workerObjects = data; }, (error) => { console.error(error); });
    }
    addNew() {
        this.isEditing = true;
        this.iWorkerObject = new WorkerObject;
    }
    editWorkerObject(workerObject: WorkerObject) {
        this.isEditing = true;
        this.iWorkerObject = workerObject;
        this.getAllWorkerObjects();
    }
    deleteWorkerObject(workerObjectId: string) {
        this.workerObjectService.deleteWorkerObject(workerObjectId).subscribe((data) => { this.notifyResult(data, () => { this.getAllWorkerObjects(); });  }, (error) => { console.error(error); });
        
    }
    updateItem() {
        if (this.isEditing) {
            this.workerObjectService.updateWorkerObject(this.iWorkerObject)
                .subscribe((data) => { this.notifyResult(data, () => { this.getAllWorkerObjects(); this.clearItem(); });  }, (error) => { console.error(error); });
        }
    }
    clearItem() {
        this.isEditing = false;
        this.iWorkerObject = new WorkerObject;
    }
    notifyResult(data: any, func: () => void) {
        if (data.Status !== 'OK')
            alert(data.Message);
        else
            func();
    }
}