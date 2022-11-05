import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from "../../../Interface/ICategory";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() Cat:ICategory | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
