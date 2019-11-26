import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from './../service/api.service';

import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  profile: any;
  image: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  async getProfile() {
    let profile = await this.storage.get('USER_INFO');
    if (profile != null) {
      this.profile = JSON.parse(profile);
      let image = JSON.parse(this.profile.image);
      this.image = `${image.base_url}/${image.path}`;
      console.log(this.image);
    }

  }
  editProfile() {
    //<ion-icon name="create" (click)=>"editProfile()"></ion-icon>
  }
  getGameAll() {
    this.router.navigate(['/games']);
  }
  getLessonAll() {
    this.router.navigate(['/lesson']);
  }
  logout() {
    //
    this.presentAlertConfirm(); 
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'ออกจากชั้นเรียน',
      message: 'จะออกหรือไม่ ใช่ กับ ไม่',
      buttons: [
        {
          text: 'ไม่',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ใช่',
          handler: () => {
            this.storage.remove('USER_INFO').then(res => console.log("OK"));
            this.storage.remove('token').then(res => console.log('ok'));
            // this.storage
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
