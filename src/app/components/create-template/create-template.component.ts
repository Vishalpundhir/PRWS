// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'create-template',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, FormsModule],
//   templateUrl: './create-template.component.html',
//   styleUrls: ['./create-template.component.css']
// })
// export class CreateTemplateComponent implements OnInit {
//   additionalInfo = ['MAX', 'AVG', 'MIN'];
//   groupNameList = ["Small molecule","Large molecule","Equipment","Audit" ]

//   parameters: string[] = [];
//   reportName: string = '';
//   groupName: string = '';
//   selectedParameter: string = '';
//   selectedAdditionalInfo: string = '';
//   isDropdownOpen: boolean = false;
//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getParametersList();
//   }
//   toggleDropdown(): void {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }

//   getParametersList(): void {
//     this.http.get("http://localhost:8080/bms-reports/v1/parameters", { responseType: 'json' }).subscribe(
//       (data: any) => { 
//         this.parameters = data;
//       },
//       (error) => {
//         console.error('Error fetching parameters', error);
//       }
//     );
//   }

//   postTemplate(): void {
//     const templateObj = {
//       name: this.reportName,
//       report_group: this.groupName,
//       parameter: this.selectedParameter,
//       additionalInfo: this.selectedAdditionalInfo
//     };
//     console.log('Data to be sent:', templateObj);
//     this.http.post("http://localhost:8080/bms-reports/v1/createTemplate", 
//     templateObj, { responseType: 'json' }).subscribe(
//       (successResponse: any) => {
//         console.log("Response: ", successResponse);
//         alert("Template added successfully")
//       },
//       (error) => {
//         console.error('Error posting template', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'create-template',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  additionalInfo = ['MAX', 'AVG', 'MIN'];
  groupNameList = ["Small molecule", "Large molecule", "Equipment", "Audit"];
  parameters: string[] = [];
  reportName: string = '';
  groupName: string = '';
  selectedParameters: string[] = [];
  selectedAdditionalInfo: string = '';
  isDropdownOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getParametersList();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getParametersList(): void {
    this.http.get("http://localhost:8080/bms-reports/v1/parameters", { responseType: 'json' }).subscribe(
      (data: any) => { 
        this.parameters = data;
      },
      (error) => {
        console.error('Error fetching parameters', error);
      }
    );
  }

  onParameterChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedParameters.push(value);
    } else {
      const index = this.selectedParameters.indexOf(value);
      if (index > -1) {
        this.selectedParameters.splice(index, 1);
      }
    }
  }

  postTemplate(): void {
    const templateObj = {
      name: this.reportName,
      report_group: this.groupName,
      parameters: this.selectedParameters,
      additionalInfo: this.selectedAdditionalInfo
    };
    console.log('Data to be sent:', templateObj);
    this.http.post("http://localhost:8080/bms-reports/v1/createTemplate", 
    templateObj, { responseType: 'json' }).subscribe(
      (successResponse: any) => {
        console.log("Response: ", successResponse);
        alert("Template added successfully");
      },
      (error) => {
        console.error('Error posting template', error);
      }
    );
  }
}
