import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from './../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.page.html',
  styleUrls: ['./lesson-detail.page.scss'],
})
export class LessonDetailPage implements OnInit {
  lesson: any;
  id:number;
  constructor(
    public loadingController: LoadingController,
    public apiService:ApiService,
    public alertController: AlertController,
    private router: ActivatedRoute,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params=>{
      console.log(params);
      this.getLessonById(params.id)
   });
  }
  getLessonById(id: number) {
    this.storage.get('token').then(token=>{
      this.apiService.getLessonByid(id, token).subscribe(result => {
        if (result.success === true) {
          this.lesson = result.data;
          console.warn('lesson');
          console.warn(this.lesson);
        }  
      });
    });
  }

}
