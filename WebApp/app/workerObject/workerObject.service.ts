import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { WorkerObject } from './workerObject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WorkerObjectService {

    constructor(private http: Http) { }

    getWorkerObjects(): Observable<WorkerObject[]> {
        return this.http.get('/AngularWorker/GetWorkerObjects')
            .map((resp: Response) => {

                let workerObjectsList = resp.json();
                let workerObjects: WorkerObject[] = [];
                for (let index in workerObjectsList) {
                    console.log(workerObjectsList[index]);
                    let workerObject = workerObjectsList[index];
                    workerObjects.push({
                        workerObjectId: workerObject.workerObjectId,
                        address: workerObject.address,
                        workerCount: workerObject.workerCount});
                }
                return workerObjects;
            }).catch((error: any) => { return Observable.throw(error); });;
    }

    updateWorkerObject(obj: WorkerObject) {
        const body = JSON.stringify({ "workerObject": obj });

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/AngularWorker/UpdateWorkerObject', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    deleteWorkerObject(obj: string) {
        const body = JSON.stringify({"workerObjectId" : obj});

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

        return this.http.post('/AngularWorker/DeleteWorkerObject', body, { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }
}