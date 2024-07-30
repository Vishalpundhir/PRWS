import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'export-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-report.component.html',
  styleUrls: ['./export-report.component.css']
})
export class ExportReportComponent {
  reports = ['Report 1', 'Report 2', 'Report 3'];  
}
