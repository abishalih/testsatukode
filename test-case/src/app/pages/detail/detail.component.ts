import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: number = 0;
  authPayload = {
    isLogin: false,
    name: '',
    password: '',
    username: ''
  };

  constructor(private route: ActivatedRoute) { }
  
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

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
      // You can use the userId here
    }
  }
}
