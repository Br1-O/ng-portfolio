import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { Repository } from '../../../../interfaces/repository.interface';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent, ButtonArrowComponent],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  //animation
  isVisible = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const element = document.querySelector('#projects');
    if (element) {
      const rect = element.getBoundingClientRect();
      const topInView = rect.top >= 0 && rect.top <= window.innerHeight;
      this.isVisible = topInView;
    }
  }
  
  //injects
  user:string = "Br1-O";
  projects: Repository[] = [];

  projectsService: ProjectsService;

  constructor(@Inject(ProjectsService) projectsService: ProjectsService) {
    this.projectsService = projectsService;
  }

  //on init
  ngOnInit(): void {

    //add private projects cards
    let privateProject: Repository = 
    {
      name: "NextFlix",
      html_url: null,
      homepage: "https://nextflix-br1.vercel.app/",
      description: "Un clon fullstack funcional de Netflix, usando su propia base de datos para peliculas y usuarios.",
      img: "https://i.imgur.com/0cG22c7.png",
      topics: ["React.js", "Next.js", "JWT", "MongoDB"],
    };

    this.projects.push(privateProject);

    //fetch public repositories
    this.projectsService.getProjects(this.user).subscribe(
      {
        next: (projects: Repository[]) => 
        {
          this.getOnlyPersonalProjects(projects);
        },
        error: (err: Error) => {
          console.log(err);
        }
      }
    );
  }

  //filter to only show personal projects
  getOnlyPersonalProjects(data: Repository[]): void {
    let indexKeyWord = 0;
    
    data.forEach((project) => {
  
      if (project.description != null) {
        indexKeyWord = project.description.indexOf("[PROJECT");
      }
  
      if (indexKeyWord !== -1) {
        // Push the project into the array
        this.projects.push(project);

        // Normalize project's name
        let formattedName =  ((this.projects[this.projects.length - 1].name).replaceAll("-", " ")).replaceAll("_", " ");

        formattedName = formattedName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        this.projects[this.projects.length - 1].name = formattedName;

        // Set proper project's image
        if ((project.description).includes("[PROJECT -")) {
          // Set the 'img' property using the last added project
          this.projects[this.projects.length - 1].img = project.description.substring((indexKeyWord + 11), project.description.indexOf("]"));
        }else{
          this.projects[this.projects.length - 1].img = "images/logo.jpg";
        }

        // Set proper description
        if ((project.description).includes("[PROJECT") && (project.description).includes("{")) {
          let desiredLang= "es";

          switch (desiredLang) {
            case "en":
              let indexStartDescriptionEnglish = project.description.indexOf("{ENGLISH:");
              let indexEndDescriptionEnglish = project.description.indexOf("}");

              this.projects[this.projects.length - 1].description = project.description.substring(indexStartDescriptionEnglish + 11, indexEndDescriptionEnglish);
            break;
          
            case "es":
              let indexStartDescriptionSpanish = project.description.indexOf("(ESPAÑOL:");
              let indexEndDescriptionSpanish = project.description.indexOf(")");

              this.projects[this.projects.length - 1].description = project.description.substring(indexStartDescriptionSpanish + 10, indexEndDescriptionSpanish);
            break;
          }
        }

        // Set the labels for languages and technologies
        this.projects[this.projects.length - 1].topics = project.topics;
      }
    });
  }
}
