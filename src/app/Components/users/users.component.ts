import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //user table columns and 
  displayedColumns: string[] = ['avatar_url', 'id', 'login', 'score']
  dataSource :any
  //styles through variable for switch list and  view
  listColor:any;
  viewColor:any; 
  users = Array() //users array
  view:Boolean = false; //show and hiding the div based on need
  lists:Boolean = false;
  filterValue!: string; //filter input 
  heading = "Users"; //for header page
  constructor(public userService:UsersService) { }

  ngOnInit(): void {
    this.Getusers(); //default loading
    this.views()
  }
  list(){
    //list icon click method
    this.viewColor = ""
    this.listColor = "Color"; 
    this.view = false;
    this.lists = true;
  }
  views(){
    //view icon click method
    this.listColor = "";
    this.viewColor = "Color";
    this.lists = false;
    this.view = true;
  }

  Getusers() {
    //Get user api call for users data
    this.userService.GetUser().subscribe(
     async (data: any) => {
     this.users = data.items;
     this.dataSource = data.items;   
      },
    );
  }


  Search () {
    //search by input method based on login and id
    const filteredData = this.users.filter((value: { login: string , id:any, score:String }) => {
      const searchStr = this.filterValue.toLowerCase();
      const login = value.login.toLowerCase().includes(searchStr);  
      const id = value.id.toString().includes(searchStr);             
      return login || id;
    });
    if(this.view == true){
      this.users = filteredData
    }
    else{
      this.dataSource = filteredData
    }
  }
  
  //if searchinput value of length equal to zero
  public filter = (value: string) => {
    if(value.length == 0){   
        this.Getusers()
    }
  };
}
