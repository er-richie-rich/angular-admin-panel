import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild("caption") caption!: ElementRef;
  roleName = "";
  authUser: any = {};
  panelOpenState = false;
  open:boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document,
              public elementRef: ElementRef,
              private renderer: Renderer2,
  ) {  }

  ngOnInit(): void {
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }

  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  showSubMenu(){
    if(this.open){
      this.open = false;
      this.renderer.removeClass(this.document.body, 'submenu-open');
    }
    else {
      this.open = true;
      this.renderer.addClass(this.document.body, 'submenu-open');
    }
  }

  showInventoryReportSubMenu(){
    if(this.open){
      this.open = false;
      this.renderer.removeClass(this.document.body, 'submenu2-open');
    }
    else {
      this.open = true;
      this.renderer.addClass(this.document.body, 'submenu2-open');
    }
  }
}
