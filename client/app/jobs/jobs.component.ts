import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { JobService } from '../services/job.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Job } from '../shared/models/job.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  job = new Job();
  jobs: Job[] = [];
  isLoading = true;
  isEditing = false;

  addJobForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private jobService: JobService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getJobs();
    this.addJobForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      data => this.jobs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.jobService.addJob(this.addJobForm.value).subscribe(
      res => {
        this.jobs.push(res);
        this.addJobForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(job: Job) {
    this.isEditing = true;
    this.job = job;
  }

  cancelEditing() {
    this.isEditing = false;
    this.job = new Job();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getJobs();
  }

  editCat(job: Job) {
    this.jobService.editJob(job).subscribe(
      () => {
        this.isEditing = false;
        this.job = job;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(job: Job) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.jobService.deleteJob(job).subscribe(
        () => {
          const pos = this.jobs.map(elem => elem._id).indexOf(job._id);
          this.jobs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
