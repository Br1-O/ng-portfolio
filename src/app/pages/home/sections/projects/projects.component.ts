import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { Repository } from '../../../../interfaces/repository.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../../../translate-config.module';
import { ScrollSpyDirective } from '../../../../directives/scroll-spy.directive';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent, ButtonArrowComponent, TranslateModule, ScrollSpyDirective],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  
  //injects
  user:string = "Br1-O";
  projects: Repository[] = [];

  constructor(@Inject(ProjectsService) private projectsService: ProjectsService, 
              private translateConfig: TranslateConfigModule, 
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadProjects();

    // Subscribe to language change
    this.translate.onLangChange.subscribe(() => {
      this.loadProjects(); // Reload project data whenever language changes
    });
  }

  loadProjects(): void {
    let privateProject: Repository = { name: "", html_url: "", homepage: "", description: "", img: "", topics: [] };

    switch (this.translateConfig.getCurrentLanguage()) {
      case 'es':
        privateProject = this.getPrivateProject('es');
        break;
      case 'en':
        privateProject = this.getPrivateProject('en');
        break;
      default:
        privateProject = this.getPrivateProject('es');
        break;
    }

    this.projects = [privateProject]; // Reset and add private project

    // Fetch public repositories
    this.projectsService.getProjects(this.user).subscribe({
      next: (projects: Repository[]) => this.getOnlyPersonalProjects(projects),
      error: (err: Error) => console.log(err)
    });
  }

  getPrivateProject(lang: string): Repository {
    return {
      name: "NextFlix",
      html_url: null,
      homepage: "https://nextflix-br1.vercel.app/",
      description: lang === 'es' ? "Un clon fullstack funcional de Netflix, usando su propia base de datos para peliculas y usuarios." 
                                : "A functional fullstack clone of Netflix, that uses its own database for movies and users.",
      img: "https://i.imgur.com/0cG22c7.png",
      topics: ["React.js", "Next.js", "JWT", "MongoDB"]
    };
  }

  getOnlyPersonalProjects(data: Repository[]): void {
    let indexKeyWord = 0;
    
    data.forEach((project) => {
      if (project.description != null) {
        indexKeyWord = project.description.indexOf("[PROJECT");
      }
  
      if (indexKeyWord !== -1) {
        this.projects.push(project);
        this.formatProject(project, indexKeyWord);
      }
    });
  }

  formatProject(project: Repository, indexKeyWord: number): void {
    let formattedName = project.name.replaceAll("-", " ").replaceAll("_", " ");
    formattedName = formattedName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    project.name = formattedName;

    // Set proper image
    project.img = project.description.includes("[PROJECT -") ? project.description.substring(indexKeyWord + 11, project.description.indexOf("]")) : "images/logo.jpg";

    // Set proper description based on language
    if (project.description.includes("[PROJECT") && project.description.includes("{")) {
      this.setDescriptionBasedOnLanguage(project);
    }

    // Set the labels for languages and technologies
    project.topics = project.topics;
  }

  setDescriptionBasedOnLanguage(project: Repository): void {
    switch (this.translateConfig.getCurrentLanguage()) {
      case "en":
        let indexStartDescriptionEnglish = project.description.indexOf("{ENGLISH:");
        let indexEndDescriptionEnglish = project.description.indexOf("}");
        project.description = project.description.substring(indexStartDescriptionEnglish + 10, indexEndDescriptionEnglish);
        break;

      case "es":
        let indexStartDescriptionSpanish = project.description.indexOf("(ESPAÑOL:");
        let indexEndDescriptionSpanish = project.description.indexOf(")");
        project.description = project.description.substring(indexStartDescriptionSpanish + 10, indexEndDescriptionSpanish);
        break;
    }
  }
}
