import { Routes } from '@angular/router';
import { HomeComponent } from './TrainerComponent/home/home.component';
import { AsideComponent } from './TrainerComponent/aside/aside.component';
import { MarksComponent } from './TrainerComponent/marks/marks.component';
import { CourseComponent } from './TrainerComponent/course/course.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"aside",component:AsideComponent},
    {path:"marks",component:MarksComponent},
    {path:"course",component:CourseComponent}

];
