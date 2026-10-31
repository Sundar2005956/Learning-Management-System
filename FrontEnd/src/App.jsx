
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './authentication/Login';
import Registration from './authentication/Registration';
import Instructordashboard from './instructor/Instructordashboard';
import Studentdashboard from './student/Studentdashboard';

import Assignment from './pages/Assignment';
import Course from './pages/Course';
import Enrollment from './pages/Enrollment';
import Lesson from './pages/Lesson';
import LessonProgress from './pages/LessonProgress';
import Submission from './pages/Submission';
import MyCourses from './subPages/MyCourses';
import MyAssignments from './subPages/MyAssignments';
import MySubmissions from './subPages/MySubmissions';

function App() {
    return (
        
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/student-dashboard"
                    element={<Studentdashboard />}
                />

                <Route
                    path="/instructor-dashboard"
                    element={<Instructordashboard />}
                />

                <Route path="/assignment" element={<Assignment />} />
                <Route path="/course" element={<Course />} />
                <Route path="/enrollment" element={<Enrollment />} />
                <Route path="/lesson" element={<Lesson />} />
                <Route path="/lesson-progress" element={<LessonProgress />} />
                <Route path="/submission" element={<Submission />} />
                <Route path='/mycourses' element={<MyCourses/>}/>
                <Route path='/myassignment' element={<MyAssignments/>}/>
                <Route path='/mysubmissions' element={<MySubmissions/>}/>

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
    );
}

export default App;
