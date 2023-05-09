import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authPayload = {
    username: '',
    password: ''
  };
  result: any[] = [];

  constructor(private authService: AuthServiceService, private router: Router) { }

  onSubmit() {
    const authPayload = this.authPayload;
    this.authService.authLogin().subscribe((result: any[]) => {
      localStorage.setItem('listUser', JSON.stringify(result));
      this.result = result.filter(({username})=>username.toLowerCase() ===authPayload.username.toLowerCase() && username.toLowerCase() === authPayload.password.toLowerCase());
    });
    if(this.result.length>0){
      const {
        id, name, username, email, address
      } = this.result[0]
      console.log({ 
        message:"Sukses login", 
        result :{
          id, name, username, email, address
        } 
      });
      
      localStorage.setItem('username', username);
      localStorage.setItem('name', name);
      localStorage.setItem('password', authPayload.password);
      localStorage.setItem('isLogin', "true");
      
      this.router.navigateByUrl('/');
    }
  }
}
