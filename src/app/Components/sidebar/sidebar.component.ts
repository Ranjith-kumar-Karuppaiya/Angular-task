import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() { }
  //declaring array for sidenav
  sideNav = [
    {
      icon:'map'
    },
    {
      icon:'search',
 
    },
    {
      icon:'work_outline',
      routerLink:''
    },
    {
      icon:'space_dashboard',
      routerLink:'/users'
    },
    {
      icon:'insert_drive_file',

    },
    {
      icon:'location_history',
     
    },
    {
      icon:'location_city'
    },
    {
      icon:'refresh'
    },
    {
      icon:'accessibility_new'
    },
    
  ]
  ngOnInit(): void {
  }

}
