import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface TemplateData {
  id: number;
  name: string;
  report_group: string;
  additionalInfo: string;
  parameters: string[];
  selected?: boolean;
}

@Component({
  selector: 'list-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})
export class ListTemplateComponent implements OnInit {
  data: TemplateData[] = [];
  parameterDetailsVisibility: boolean[] = [];
  isEditVisible = false;
  selectedTemplate: TemplateData = {
    id: 0,
    name: '',
    report_group: '',
    additionalInfo: '',
    parameters: [],
    selected: false
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.http.get<TemplateData[]>('http://localhost:8080/bms-reports/v1/templates', { responseType: 'json' }).subscribe(
      (response: TemplateData[]) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching templates', error);
      }
    );
  }

  toggleAllCheckboxes(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.data.forEach(item => item.selected = checked);
  }

  deleteSelected(): void {
    const selectedItems = this.data.filter(item => item.selected);
    if (selectedItems.length > 0) {
      const idsToDelete = selectedItems.map(item => item.id);
      this.http.post('http://localhost:8080/bms-reports/v1/deleteTemplates', idsToDelete, { responseType: 'json' })
        .subscribe(
          (response: any) => {
            console.log("Deleted IDs:", response);
            this.data = this.data.filter(item => !item.selected);
          },
          (error) => {
            console.error('Error deleting templates', error);
          }
        );
    }
    else{
            alert("None of the parameter is been selected for Delete");
          }
  }

  getShortParameters(parameters: string[]): string {
    if (parameters.length === 0) {
      return '';
    }
    return parameters.slice(0, 1).join(', ') + (parameters.length > 2 ? ', ...' : '');
  }

  toggleParameterDetails(index: number): void {
    this.parameterDetailsVisibility[index] = !this.parameterDetailsVisibility[index];
  }

  isParameterDetailsVisible(index: number): boolean {
    return this.parameterDetailsVisibility[index];
  }

  editSelected(): void {
    const selectedItems = this.data.filter(item => item.selected);
    if (selectedItems.length !== 1) {
      alert('Please select exactly one template to edit.');
      return;
    }
    this.selectedTemplate = { ...selectedItems[0] };
    this.isEditVisible = true;
  }

  saveEdit(): void {
    if (this.selectedTemplate) {
      const index = this.data.findIndex(item => item.id === this.selectedTemplate.id);
      if (index > -1) {
        this.data[index] = { ...this.selectedTemplate };
        this.isEditVisible = false;
        this.selectedTemplate = {
          id: 0,
          name: '',
          report_group: '',
          additionalInfo: '',
          parameters: [],
          selected: false
        };
      }
    }
  }

  cancelEdit(): void {
    this.isEditVisible = false;
    this.selectedTemplate = {
      id: 0,
      name: '',
      report_group: '',
      additionalInfo: '',
      parameters: [],
      selected: false
    };
  }
}
