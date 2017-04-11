import { WorkerObject } from '../workerObject/workerObject';
import { Worker } from '../worker/worker';
import { WorkerShift } from './workerShift';

export class WorkerShiftViewModel {
    workerObjects: WorkerObject[];
    workers: Worker[];
    shifts: WorkerShift[];
}