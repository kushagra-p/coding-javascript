import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-team-toolbar',
  templateUrl: './team-toolbar.component.html',
  styleUrls: ['./team-toolbar.component.css']
})
export class TeamToolbarComponent implements OnInit {
links=["Create Team","View Team"];
  navLinks!: any[];
  constructor(private router:Router, private service:DataService) {
    this.navLinks=[
      {
        label:'Create Team',
        link: './team/create',
        index:0
      },
      {
        label:'View Team',
        link: './team/view',
        index:1
      }
    ]
   }


  ngOnInit(): void {

  }

}
