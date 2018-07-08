import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from '../services/project.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Project } from '../shared/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project = new Project();
  projects: Project[] = [];
  isLoading = true;
  isEditing = false;

  addProjectForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private projectService: ProjectService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getProjects();
    this.addProjectForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      data => this.projects = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.projectService.addProject(this.addProjectForm.value).subscribe(
      res => {
        this.projects.push(res);
        this.addProjectForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(project: Project) {
    this.isEditing = true;
    this.project = project;
  }

  cancelEditing() {
    this.isEditing = false;
    this.project = new Project();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getProjects();
  }

  editCat(project: Project) {
    this.projectService.editProject(project).subscribe(
      () => {
        this.isEditing = false;
        this.project = project;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(project: Project) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.projectService.deleteProject(project).subscribe(
        () => {
          const pos = this.projects.map(elem => elem._id).indexOf(project._id);
          this.projects.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
