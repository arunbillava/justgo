import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { PlaceService } from '../services/place.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {

  place = {};
  places = [];
  isLoading = true;
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  when = new FormControl('', Validators.required);
  teamSize = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private placeService: PlaceService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getPlace();
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      when: this.when,
      teamSize: this.teamSize,
      description:this.description
    });
  }

  getPlace() {
    this.placeService.getPlaces().subscribe(
      data => this.places = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addPlace() {
    this.placeService.addPlace(this.addCatForm.value).subscribe(
      res => {
        const newPlace = res.json();
        this.places.push(newPlace);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(place) {
    this.isEditing = true;
    this.place = place;
  }

  cancelEditing() {
    this.isEditing = false;
    this.place = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getPlace();
  }

  editPlace(place) {
    this.placeService.editplace(place).subscribe(
      res => {
        this.isEditing = false;
        this.place = place;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletePlace(place) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.placeService.deleteplace(place).subscribe(
        res => {
          const pos = this.places.map(elem => elem._id).indexOf(place._id);
          this.places.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
