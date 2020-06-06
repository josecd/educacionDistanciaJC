import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  id: any;
  private sub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) {
    // this.id = this.route.snapshot.paramMap.get("id");
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('Cambios', this.id);

    });
    console.log(this.id);

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {

  }

  btn() {
    console.log(this.id);

  }
}
