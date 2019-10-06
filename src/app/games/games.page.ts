import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from './../service/api.service';
import { environment } from '../service/environment.prod';


@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit { 
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
    this.getGameAll();
  } 
  getGameAll(){
    this.storage.get('token').then(result => {
      const token = result;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.BASE_URL}/game/game-all`);
    });
  }

}
