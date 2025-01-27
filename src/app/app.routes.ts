import { Routes } from '@angular/router';
import { HomeComponent } from './Trainer/home/home.component';
import { AsideComponent } from './Manager/Calendar/aside.component';
import { MarksComponent } from './Trainer/marks/marks.component';
import { CourseComponent } from './Trainer/course/course.component';
import { ChecklistComponent } from './Trainer/checklist/checklist.component';
import { RoadmapComponent } from './CommonComponent/roadmap/roadmap.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { ManagerDashboardComponent } from './Manager/manager-dashboard/manager-dashboard.component';
import { StudentDetailsComponent } from './Manager/student-details/student-details.component';
import { CourseDetailsComponent } from './Manager/course-details/course-details.component';
import { TrainersComponent } from './Manager/trainers/trainers.component';
import { PublishMarksComponent } from './Manager/publish-marks/publish-marks.component';
import { InsightsComponent } from './Manager/insights/insights.component';
import { ForgetPasswordComponent } from './Login/forget-password/forget-password.component';
import { CardComponent } from './Trainer/card/card.component';
import { TraineeCourseComponent } from './trainee/trainee-course/trainee-course.component';
import { TraineeDashboardComponent } from './trainee/trainee-dashboard/trainee-dashboard.component';
import { TraineeFeedbackComponent } from './trainee/trainee-feedback/trainee-feedback.component';
import { TraineeResultComponent } from './trainee/trainee-result/trainee-result.component';
import { TraineeTrackerComponent } from './trainee/trainee-tracker/trainee-tracker.component';
import { LayoutComponent } from './Trainer/header/layout.component';
import { TrainermarkComponent } from './MARKS/trainermark/trainermark.component';
import { ManagerMarksComponent } from './MARKS/manager-marks/manager-marks.component';
import { ManagerRoadmapComponent } from './Manager/manager-roadmap/manager-roadmap.component';



export const routes: Routes = [
    {path:"",component:LoginComponentComponent},
    {path:"login",component:LoginComponentComponent},

    {path:"roadmap",component:RoadmapComponent},

    {path:"trainee-course",component:TraineeCourseComponent},
    {path:"trainee-dashboard",component:TraineeDashboardComponent},
    {path:"trainee-feedback",component:TraineeFeedbackComponent},
    {path:"trainee-result",component:TraineeResultComponent},
    {path:"trainee-tracker",component:TraineeTrackerComponent},

    {path:"manager-dashboard",component:ManagerDashboardComponent},
    {path:"manager-studentDetails",component:StudentDetailsComponent},
    {path:"manager-course",component:CourseDetailsComponent},
    {path:"manager-trainerDetails",component:TrainersComponent},
    {path:"manager-publishMarks",component:PublishMarksComponent},
    {path:"manager-insights",component:InsightsComponent},
    {path:"manager-roadmap",component:ManagerRoadmapComponent},
    {path:"manager-calendar",component:AsideComponent},

    
    {path:"trainer-dashboard",component:HomeComponent},
    {path:"trainer-publishMarks",component:MarksComponent},
    {path:"trainer-course",component:CourseComponent},
    {path:"trainer-checklist",component:ChecklistComponent},
    {path:"card",component:CardComponent},

    {path:"trainermark",component:TrainermarkComponent},
    {path:"markuhh",component:ManagerMarksComponent},
    {path:"forgetpassword",component:ForgetPasswordComponent},




    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
