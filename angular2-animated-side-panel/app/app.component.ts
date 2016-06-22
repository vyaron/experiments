import { Component } from '@angular/core';

import {SidePanelComponent} from "./side-panel.component";

@Component({
  selector: 'my-app',
  directives: [SidePanelComponent],
  templateUrl: "/app/app.template.html",
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
  `]
})
export class AppComponent {

}
