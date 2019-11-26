import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from './../service/api.service';
import { environment } from '../service/environment.prod';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  safeUrl: SafeResourceUrl;
  private urlValue: string;
  constructor(
    private router: Router,
    public apiService:ApiService,
    public alertController: AlertController,
    private storage: Storage, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getAbout();
  } 
  getAbout(){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.BASE_URL}/game/about`);
  }



}
