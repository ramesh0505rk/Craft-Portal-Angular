import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { sampleProjects } from './sampleProjects';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.scss'
})
export class CreateProjectModalComponent implements OnInit {

  @Input() createProjectActive: boolean = false;
  @Output() createProjectActiveChange = new EventEmitter<boolean>();

  templates: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.templates = sampleProjects;
  }

  closeModal() {
    this.createProjectActive = false;
    this.createProjectActiveChange.emit(this.createProjectActive);
  }

}
