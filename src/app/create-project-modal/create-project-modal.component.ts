import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.scss'
})
export class CreateProjectModalComponent {

  @Input() createProjectActive: boolean = false;
  @Output() createProjectActiveChange = new EventEmitter<boolean>();

  constructor() { }

  closeModal() {
    this.createProjectActive = false;
    this.createProjectActiveChange.emit(this.createProjectActive);
  }

}
