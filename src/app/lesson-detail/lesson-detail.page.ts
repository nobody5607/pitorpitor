import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from './../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params=>{
      console.log(params);
      this.getLessonById(params.id)
   });
  }
  getLessonById(id: number) {
    this.apiService.getLessonByid(id).subscribe(result => {
      if (result.success === true) {
        this.lesson = result.data;
        console.warn('lesson');
        console.warn(this.lesson);
      }  
    });
  }

}
