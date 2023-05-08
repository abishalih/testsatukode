import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authPayload = {
    isLogin: false,
    name: '',
    password: '',
    username: ''
  };

  constructor() { }
  
  ngOnInit() {
    // Retrieve the saved username from localStorage
    const isLogin = localStorage.getItem('isLogin')==="true"?true:false;
    const name = localStorage.getItem('name') || "";
    const password = localStorage.getItem('password') || "";
    const username = localStorage.getItem('username') || "";

    this.authPayload = {
      isLogin,
      name,
      password,
      username,
    }
    console.log({authPayload:this.authPayload});
    
  }
}
