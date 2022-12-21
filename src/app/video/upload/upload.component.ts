import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { tap, last, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { ClipService } from '../../services/clip.service';
import IClip from 'src/app/models/clip.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit, OnDestroy {
  isDragover: boolean = false;
  file: File | null = null;
  nextStep: boolean = false;
  showAlert: boolean = false;
  alertColor: string = 'blue';
  alertMsg: string = 'Please wait! Your clip is being uploaded!';
  inSubmission: boolean = false;
  percentange: number = 0;
  showPercentage: boolean = false;
  user: firebase.User | null = null;
  task: AngularFireUploadTask | null = null;

  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  uploadForm = new FormGroup({
    title: this.title,
  });

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user
      .pipe(
        tap({
          next: (user): void => {
            this.user = user;
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

  ngOnDestroy(): void {
    this.task?.cancel();
  }

  storeFile($event: Event): void {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(this.file?.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile(): void {
    this.uploadForm.disable();

    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded!';
    this.inSubmission = true;

    const clipFileName: string = uuid();
    const clipPath: string = `clips/${clipFileName}.mp4`;

    this.task = this.storage.upload(
      clipPath,
      this.file
    ) as AngularFireUploadTask;
    const clipRef: AngularFireStorageReference = this.storage.ref(clipPath);
    this.task
      .percentageChanges()
      .pipe(
        tap({
          next: (progress: number | undefined): void => {
            this.percentange = (progress as number) / 100;
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

    this.task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL()),
        tap({
          next: async (url: string): Promise<void> => {
            const clip = {
              uid: this.user?.uid as string,
              displayName: this.user?.displayName as string,
              title: this.title.value as string,
              fileName: `${clipFileName}.mp4` as string,
              url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };

            const clipDocRef: DocumentReference<IClip> = await this.clipsService.createClips(
              clip
            );

            this.alertColor = 'green';
            this.alertMsg = 'Success! You video has been uploaded!';
            this.showPercentage = false;

            setTimeout(() => {
              this.router.navigate(['clip', clipDocRef.id]);
            }, 1000);
          },
          error: (): void => {
            this.uploadForm.enable();
            this.alertColor = 'red';
            this.alertMsg = 'Upload failed! Please try again later';
            this.inSubmission = true;
            this.showPercentage = false;
          },
          complete: (): void => {
            return;
          },
        })
      )
      .subscribe();
  }
}
