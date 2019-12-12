import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from './../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false; 
  constructor(
    public loadingController: LoadingController,
    public apiService:ApiService,
    public alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  Login(form){
    const username = form.value.username;
    const password = form.value.password;
    this.present();
    this.apiService.login(username, password).subscribe(result => {
          this.dismiss();
          if (result['success'] === false){
            this.presentAlert('Warning', 'กรุณาตรวจสอบ Username หรือ Password');
            return false;
          } else { 
            this.router.navigate(['home']);
          }
    }, error => {
      this.presentAlert('Warning', error.toString());
    });

  }
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  about(){
    this.router.navigate(['about']);
  }

}
