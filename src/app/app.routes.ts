import { Routes } from '@angular/router';
import { HomeComponent } from './TrainerComponent/home/home.component';
import { AsideComponent } from './Manager/Calendar/aside.component';
import { MarksComponent } from './TrainerComponent/marks/marks.component';
import { CourseComponent } from './TrainerComponent/course/course.component';
import { ChecklistComponent } from './TrainerComponent/checklist/checklist.component';
import { RoadmapComponent } from './CommonComponent/roadmap/roadmap.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { ManagerDashboardComponent } from './Manager/manager-dashboard/manager-dashboard.component';
import { StudentDetailsComponent } from './Manager/student-details/student-details.component';
import { CourseDetailsComponent } from './Manager/course-details/course-details.component';
import { TrainersComponent } from './Manager/trainers/trainers.component';
import { PublishMarksComponent } from './Manager/publish-marks/publish-marks.component';
import { InsightsComponent } from './Manager/insights/insights.component';
import { ForgetPasswordComponent } from './Login/forget-password/forget-password.component';
import { CardComponent } from './TrainerComponent/card/card.component';
import { TraineeCourseComponent } from './trainee/trainee-course/trainee-course.component';
import { TraineeDashboardComponent } from './trainee/trainee-dashboard/trainee-dashboard.component';
import { TraineeFeedbackComponent } from './trainee/trainee-feedback/trainee-feedback.component';
import { TraineeResultComponent } from './trainee/trainee-result/trainee-result.component';
import { TraineeTrackerComponent } from './trainee/trainee-tracker/trainee-tracker.component';
import { LayoutComponent } from './TrainerComponent/layout/layout.component';
import { TrainermarkComponent } from './MARKS/trainermark/trainermark.component';
import { ManagerMarksComponent } from './MARKS/manager-marks/manager-marks.component';
import { ManagerRoadmapComponent } from './Manager/manager-roadmap/manager-roadmap.component';



export const routes: Routes = [
    {path:"",component:LoginComponentComponent},
    {path:"login",component:LoginComponentComponent},

    {path:"home",component:HomeComponent},
    {path:"aside",component:AsideComponent},
    {path:"marks",component:MarksComponent},
    {path:"course",component:CourseComponent},
    {path:"check",component:ChecklistComponent},
    {path:"card",component:CardComponent},

    {path:"timeline",component:RoadmapComponent},
    {path:"manager",component:ManagerDashboardComponent},
    {path:"student-details",component:StudentDetailsComponent},
    {path:"course-details",component:CourseDetailsComponent},
    {path:"Trainers",component:TrainersComponent},
    {path:"PublishMarks",component:PublishMarksComponent},
    {path:"Insights",component:InsightsComponent},
    {path:"manager-roadmap",component:ManagerRoadmapComponent},
    
    {path:"forgetpassword",component:ForgetPasswordComponent},
   
    {path:"trainee-course",component:TraineeCourseComponent},
    {path:"trainee-dashboard",component:TraineeDashboardComponent},
    {path:"trainee-feedback",component:TraineeFeedbackComponent},
    {path:"trainee-result",component:TraineeResultComponent},
    {path:"trainee-tracker",component:TraineeTrackerComponent},
    {path:"forgetpassword",component:ForgetPasswordComponent},

    {path:"lay",component:LayoutComponent},

    {path:"trainermark",component:TrainermarkComponent},
    {path:"managermark",component:ManagerMarksComponent}


];
