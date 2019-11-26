import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from './../service/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {
  lessons=[];
  constructor(
    public loadingController: LoadingController,
    public apiService:ApiService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage 
  ) { } 

  ngOnInit() {
    this.getLessons('');
  }
  getLessons(term = ''){
    console.log('getLesson');
    this.storage.get('token').then(token=>{
      this.apiService.getLessons(term, token).subscribe(result=>{
        console.warn(result);
        if(result === null){
          this.lessons = [];
        }else{
            if (result.success === true) {
              this.lessons = result.data;
            } else {
              
            }
        }
      });
    });
  }
  lessonDetail(data: any) { 
    this.router.navigate(['/lesson-detail', {id: data.id}]); 
  }

  //search
  getItems(ev) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      // Check the length
      if(val.length < 3) { 
        return;
      }
      setTimeout(() => {
        this.getLessons(val);
      }, 1000);

    }
  } 

}
