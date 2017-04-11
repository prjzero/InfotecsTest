import { WorkerObject } from '../workerObject/workerObject';
import { Worker } from '../worker/worker';

export class WorkerShift {
    shiftId: string;
    workerObject: WorkerObject;
    shiftDate: string;
    shiftWorkers: Worker[];
}