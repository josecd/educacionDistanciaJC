import { globals } from 'src/environments/golbals';
import { AuthServiceService } from './../../../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  userType = globals.type;
  constructor(
    private authService: AuthServiceService,
    private router: Router,

  ) { 
    console.log(globals.type);

  }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
