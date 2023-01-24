import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MaterialUiModule} from "../material-ui/material-ui.module";


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidenavComponent
    ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,MaterialUiModule
    ]
})
export class CoreModule { }
