import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<div>
                    <h2>Главная</h2>
                    <p>
                    <a class="btn btn-lg btn-default" routerLink="AngularWorker/Workers" routerLinkActive="active">Рабочие</a>
                    <a class="btn btn-lg btn-default" routerLink="AngularWorker/WorkerObjects" routerLinkActive="active">Объекты</a>
                    <a class="btn btn-lg btn-default" routerLink="AngularWorker/WorkerShifts" routerLinkActive="active">Смены</a>
                    </p>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {
    
}