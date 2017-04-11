import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Worker } from './worker';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WorkerService {

    constructor(private http: Http) { }

    getWorkers(): Observable<Worker[]> {
        return this.http.get('/AngularWorker/GetWorkers')
            .map((resp: Response) => {

                let workersList = resp.json();
                let workers: Worker[] = [];
                for (let index in workersList) {
                    console.log(workersList[index]);
                    let worker = workersList[index];
                    workers.push({
                        workerId: worker.workerId,
                        workerName: worker.workerName,
                        cost: worker.cost,
                        specialty: worker.specialty});
                }
                return workers;
            }).catch((error: any) => { return Observable.throw(error); });;
    }

    updateWorker(obj: Worker) {
        const body = JSON.stringify({ "worker": obj });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/AngularWorker/UpdateWorker', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    deleteWorker(obj: string) {
        const body = JSON.stringify({"workerId" : obj});

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/AngularWorker/DeleteWorker', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }
}