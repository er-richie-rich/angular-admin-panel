import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router,ActivatedRoute,NavigationEnd} from "@angular/router";
import { Title } from '@angular/platform-browser';
import{AdminApiService} from "../../../Service/admin-api.service";

import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title:any = "Management System"
  user:any=this.adminApiService.listLoggedUserService()
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  private adminApiService:AdminApiService
  ) {
    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const rt = this.getChild(this.activatedRoute);

          rt.data.subscribe((data: any) => {
            this.title = data.title;
            this.titleService.setTitle(this.title);
          });
        });
  }

  ngOnInit(): void {
    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const rt = this.getChild(this.activatedRoute);

          rt.data.subscribe((data: any) => {
            this.title = data.title;
            this.titleService.setTitle(this.title);
          });
        });

}
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logOut(){
      this.adminApiService.logOutService()
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
