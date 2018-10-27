import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.logout()
  }
//function to logout user 
logout(){
  localStorage.clear()
  this.router.navigate(['/login']);
}
}
