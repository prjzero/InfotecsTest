import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { WorkerShiftViewModel } from './workerShiftViewModel';
import { WorkerShift } from './workerShift';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WorkerShiftService {

    constructor(private http: Http) { }

    getWorkerShifts(): Observable<WorkerShiftViewModel> {
        return this.http.get('/AngularWorker/GetWorkerShifts')
            .map((resp: Response) => {

                let WorkerShiftList = resp.json();
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
            }).catch((error: any) => { return Observable.throw(error); });;
    }

    updateWorkerShift(shiftId: string, workerObjectId: string, workers: string[], shiftDate: string) {
        const body = JSON.stringify({ "shiftId": shiftId, "workerObjectId": workerObjectId, "workers": workers, "shiftDate": shiftDate });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/AngularWorker/UpdateShift', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    deleteWorkerShift(obj: string) {
        const body = JSON.stringify({"shiftId" : obj});

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/AngularWorker/DeleteShift', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }
}