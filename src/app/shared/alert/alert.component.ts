import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() color = 'blue';

  constructor() {}

  ngOnInit(): void {}

  get bgColor(): string {
    return `bg-${this.color}-400`;
  }
}
