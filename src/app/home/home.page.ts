import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router
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
    this.router.navigate(['/login']);
  }

}
