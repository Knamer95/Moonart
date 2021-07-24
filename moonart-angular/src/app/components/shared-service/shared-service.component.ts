import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shared-service',
  templateUrl: './shared-service.component.html',
  styleUrls: ['./shared-service.component.css']
})
@Injectable()

/*
  Component to store variables shared between components, that we want to observe
*/
export class SharedService {

  public observableReload = new BehaviorSubject<boolean>(false);
  changeVar = this.observableReload.asObservable();

  needsReload(status: boolean) {
    this.observableReload.next(status);
  }
}