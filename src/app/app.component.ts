import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { ListTemplateComponent } from './components/list-template/list-template.component';
import { ExportReportComponent } from './components/export-report/export-report.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, CreateTemplateComponent,ListTemplateComponent ,SideBarComponent, ExportReportComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PRWSFrontend';
  activeComponent = 'create'; 

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }
}
