import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';

export interface Repository {
  name: string;
  html_url: string;
  homepage: string;
  description: string;
  img: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  
  user:string = "Br1-O";
  projects: Repository[] = [];

  ngOnInit(): void {
    fetch(`https://api.github.com/users/${this.user}/repos?per_page=100&page=1`)    
    .then(response => response.json())
    .then(data => 
      {
        this.getOnlyPersonalProjects(data);
      }
    )
    .catch(error => console.error('Error:', error));
  }

  getOnlyPersonalProjects(data: Repository[]): void {
    let indexKeyWord = 0;
    
    data.forEach((project) => {
  
      if (project.description != null) {
        indexKeyWord = project.description.indexOf("[PROJECT");
      }
  
      if (indexKeyWord !== -1) {
        // Push the project into the array
        this.projects.push(project);
  
        // Set the 'img' property using the last added project
        this.projects[this.projects.length - 1].img = project.description.substring((indexKeyWord + 11), project.description.indexOf("]"));

        // Set proper description
        this.projects[this.projects.length - 1].description = project.description.substring(0, indexKeyWord);
      }
    });

    console.log(this.projects);
  }
}
