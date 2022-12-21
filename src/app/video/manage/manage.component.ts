import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClipService } from '../../services/clip.service';
import { ModalService } from '../../services/modal.service';
import IClip from 'src/app/models/clip.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  videoOrder: string = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null;
  sort$: BehaviorSubject<string> = new BehaviorSubject(this.videoOrder);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipsService: ClipService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params: ParamMap) => {
          this.videoOrder =
            params.get('sort') === '2' ? (params.get('sort') as string) : '1';
          this.sort$.next(this.videoOrder);
        })
      )
      .subscribe();
    this.clipsService
      .getUserClips(this.sort$)
      .pipe(
        tap({
          next: (docs): void => {
            this.clips = [];
            docs.forEach((doc) => {
              this.clips.push({
                docID: doc.id,
                ...doc.data(),
              });
            });
          },
          error: (): void => {
            return;
          },
          complete: (): void => {
            return;
          },
        })
      )
      .subscribe();
  }

  openModal($event: Event, clip: IClip): void {
    $event.preventDefault();
    this.activeClip = clip;
    this.modal.toggleModal('editClip');
  }

  sort(event$: Event): void {
    const { value }: { value: string } = event$.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }

  update($event: IClip): void {
    this.clips.forEach((element, index) => {
      if (element.docID === $event.docID) {
        this.clips[index].title = $event.title;
      }
    });
  }

  async deleteClip($event: Event, clip: IClip): Promise<void> {
    $event.preventDefault();

    await this.clipsService.deleteClip(clip);

    this.clips.forEach((element, index) => {
      if (element.docID === clip.docID) {
        this.clips.splice(index, 1);
      }
    });
  }
}
