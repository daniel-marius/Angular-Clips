import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipComponent implements OnInit {
  id$: Observable<string | null> = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('id'))
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
