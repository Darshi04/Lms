import { Routes } from '@angular/router';
import { HomeComponent } from './TrainerComponent/home/home.component';
import { AsideComponent } from './TrainerComponent/aside/aside.component';
import { MarksComponent } from './TrainerComponent/marks/marks.component';
import { CourseComponent } from './TrainerComponent/course/course.component';
import { ChecklistComponent } from './TrainerComponent/Component/checklist/checklist.component';
import { LoginComponentComponent } from './TrainerComponent/Component/login-component/login-component.component';
import { RoadmapComponent } from './TrainerComponent/Component/roadmap/roadmap.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"aside",component:AsideComponent},
    {path:"marks",component:MarksComponent},
    {path:"course",component:CourseComponent},
    {path:"check",component:ChecklistComponent},
    {path:"login",component:LoginComponentComponent},
    {path:"road",component:RoadmapComponent}

];
