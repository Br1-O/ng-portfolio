import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';

export const routes: Routes = 
[
    {path: "", component: HomeComponent},
    {path: "", loadComponent: () => import("./pages/home/sections/introduction/introduction.component").then((m=> m.IntroductionComponent))},
    {path: "about-me", loadComponent: () => import("./pages/home/sections/about-me/about-me.component").then((m=> m.AboutMeComponent))},
    {path: "education", loadComponent: () => import("./pages/home/sections/education/education.component").then((m=> m.EducationComponent))},
    {path: "projects", loadComponent: () => import("./pages/home/sections/projects/projects.component").then((m=> m.ProjectsComponent))},
    {path: "**", redirectTo: ""} //not found redirect
];