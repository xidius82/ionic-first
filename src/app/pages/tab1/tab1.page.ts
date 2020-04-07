import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openDetailInTab(){
    this.router.navigateByUrl('/tabs/tab1/details');
  }

}
