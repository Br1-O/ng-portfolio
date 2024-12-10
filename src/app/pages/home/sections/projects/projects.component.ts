import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ProjectCardComponent } from '../../../../components/project-card/project-card.component';
import { ButtonArrowComponent } from '../../../../components/button-arrow/button-arrow.component';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { Repository } from '../../../../interfaces/repository.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../../../translate-config.module';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent, ButtonArrowComponent, TranslateModule],
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
      // const topInView = rect.top >= 0 && rect.top <= window.innerHeight;
      const topInView =  rect.top < window.innerHeight && rect.bottom >= 0;
      this.isVisible = topInView;

      //scroll spy for navbar

      // Calculate % of the window's height
      const threshold = window.innerHeight * 0.45;
        
      // Check if at least % of the element is in view from the top or bottom
      const topInView2 = rect.top < window.innerHeight - threshold && rect.top + rect.height > threshold;
      const bottomInView = rect.bottom > threshold && rect.bottom < window.innerHeight + threshold;

      const isElementInView = topInView2 || bottomInView;

      //scroll spy for navbar
      const navbarItem: HTMLAnchorElement | null = document.querySelector(".nav-item:nth-of-type(1) a");

      if (navbarItem) {
        if (isElementInView) {
          navbarItem.style.transform = 'scale(1.3)';
          navbarItem.style.filter = 'brightness(125%)';
          navbarItem.style.color = 'var(--font-hover-color)';
          navbarItem.style.textShadow = '-2.5px -2.5px 7px var(--secondary-color), 2.5px 2.5px 2px var(--main-color)';
          navbarItem.style.borderBottom = '1px solid var(--font-color)';
        } else {
          navbarItem.style.transform = '';
          navbarItem.style.filter = '';
          navbarItem.style.color = '';
          navbarItem.style.textShadow = '';
          navbarItem.style.borderBottom = '';
        }
      }
    }
  }
  
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
