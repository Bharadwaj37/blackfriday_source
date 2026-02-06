import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-primary selection:text-white">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/course/:id" element={<CourseDetails />} />
                        <Route
                            path="/my-courses"
                            element={
                                <ProtectedRoute>
                                    <MyCourses />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <ToastContainer position="bottom-right" theme="dark" />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
