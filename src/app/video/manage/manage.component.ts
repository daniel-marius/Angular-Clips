import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder: string = '1';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params: ParamMap) => {
          this.videoOrder =
            params.get('sort') === '2' ? (params.get('sort') as string) : '1';
        })
      )
      .subscribe();
  }

  sort(event$: Event): void {
    const { value }: { value: string } = event$.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    });
  }
}
