import { Routes } from '@angular/router';
import { HomeComponent } from './TrainerComponent/home/home.component';
import { AsideComponent } from './TrainerComponent/aside/aside.component';
import { MarksComponent } from './TrainerComponent/marks/marks.component';
import { CourseComponent } from './TrainerComponent/course/course.component';
import { ChecklistComponent } from './TrainerComponent/checklist/checklist.component';
<<<<<<< HEAD
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { RoadmapComponent } from './Login/roadmap/roadmap.component';
=======
import { LoginComponentComponent } from './login-component/login-component.component';
import { RoadmapComponent } from './Manager/roadmap/roadmap.component';
>>>>>>> 20304f496dbb37aa6c21afa3307ce53dec599f6c


export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"aside",component:AsideComponent},
    {path:"marks",component:MarksComponent},
    {path:"course",component:CourseComponent},
    {path:"check",component:ChecklistComponent},
    {path:"login",component:LoginComponentComponent},
    {path:"timeline",component:RoadmapComponent}

];
