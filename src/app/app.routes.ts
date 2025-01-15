import { Routes } from '@angular/router';
import { HomeComponent } from './TrainerComponent/home/home.component';
import { AsideComponent } from './TrainerComponent/Calendar/aside.component';
import { MarksComponent } from './TrainerComponent/marks/marks.component';
import { CourseComponent } from './TrainerComponent/course/course.component';
import { ChecklistComponent } from './TrainerComponent/checklist/checklist.component';
import { RoadmapComponent } from './Manager/roadmap/roadmap.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { ManagerDashboardComponent } from './Manager/manager-dashboard/manager-dashboard.component';
import { StudentDetailsComponent } from './Manager/student-details/student-details.component';
import { CourseDetailsComponent } from './Manager/course-details/course-details.component';
import { TrainersComponent } from './Manager/trainers/trainers.component';
import { PublishMarksComponent } from './Manager/publish-marks/publish-marks.component';
import { InsightsComponent } from './Manager/insights/insights.component';


export const routes: Routes = [
    {path:"",component:LoginComponentComponent},
    {path:"home",component:HomeComponent},
    {path:"aside",component:AsideComponent},
    {path:"marks",component:MarksComponent},
    {path:"course",component:CourseComponent},
    {path:"check",component:ChecklistComponent},
    {path:"login",component:LoginComponentComponent},
    {path:"timeline",component:RoadmapComponent},
    {path:"manager",component:ManagerDashboardComponent},
    {path:"student-details",component:StudentDetailsComponent},
    {path:"course-details",component:CourseDetailsComponent},
    {path:"Trainers",component:TrainersComponent},
    {path:"PublishMarks",component:PublishMarksComponent},
    {path:"Insights",component:InsightsComponent},
    

];
