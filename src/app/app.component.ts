import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My App';

  constructor() {}

  changeTitle(title: string) {
    this.title = title;
  }
}
