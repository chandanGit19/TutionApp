import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './component/core/NavBar';
import Catalog from './pages/Catalog';
import Signup from './component/core/Signup';
import Login from './component/core/Login';
import CoursesDetails from './component/core/CoursesDetails';
import Profile from './component/core/Profile';
import EmailVerify from './pages/EmailVerify';
import About from './component/core/About';
import ContactPage from './component/core/ContactPage';
import Dashboard from './dashboardcomponent/Dashboard';
import PrivateRoute from './dashboardcomponent/PrivateRoute';
import Mycourses from './dashboardcomponent/Mycourses';
import InstructorDashbpard from './dashboardcomponent/InstructorDashbpard';
import { useDispatch, useSelector } from 'react-redux'
import Addcourses from './dashboardcomponent/Addcourses';
import EnrolledCourses from './dashboardcomponent/EnrolledCourses';
import Addtocart from './dashboardcomponent/Addtocart';
import ViewVideo from './videoSection/ViewVideo';
import Video from './videoSection/Video';


function App() {

  const {user} = useSelector((state)=>state.profile);


  
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col text-richblack-5 ">
      <NavBar/>
           <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/catalog/:catalogName' element={<Catalog/>}/>
            <Route path='/courses/:courseId' element={<CoursesDetails/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>} />
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
            
            <Route path='/verify-email' element={<EmailVerify/>}/>
            <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>

            <Route path='/dashboard/my-profile' element={<Profile/>}/>
            <Route path="/dashboard/my-courses"  element={<Mycourses/>}/>

            {
              user?.accountType === "instructor" && (
                <>
                 <Route path='/dashboard/instructor' element={<InstructorDashbpard/>}/>
                 <Route path="/dashboard/add-course" element={<Addcourses/>}/>
                </>
              )


            }


            {
              user?.accountType === "student" && (
                <>
               
                <Route path='/dashboard/cart' element={<Addtocart/>}/>
                <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
                
                </>
              )
            }
            </Route>

          <Route element={<ViewVideo/>}>
            {
              user?.accountType ==="student" && (
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<Video/>}/>
              )
            }
          </Route>



           </Routes>
    </div>
  );
}


export default App;
