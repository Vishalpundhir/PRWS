import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() componentSelected = new EventEmitter<string>();

  setActiveComponent(component: string) {
    this.componentSelected.emit(component);
  }

}
