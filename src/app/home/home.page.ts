import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage  
  ) { }

  ngOnInit() {
  }
  getGameAll(){
    this.router.navigate(['/games']);
  }
  getLessonAll(){
    this.router.navigate(['/lesson']);
  }
  logout(){
    this.storage.remove('USER_INFO').then(res=>console.log("OK"));
    this.storage.remove('token').then(res=>console.log('ok'));
    // this.storage
    this.router.navigate(['/login']);
  }

}
