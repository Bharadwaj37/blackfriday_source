import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen, User as UserIcon } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-lg fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        <span className="text-2xl">⚡</span>
                        <span>SkillForge</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-slate-300 hover:text-white transition-colors">Browse</Link>

                        {user ? (
                            <>
                                <Link to="/my-courses" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                                    <BookOpen size={18} />
                                    <span>My Courses</span>
                                </Link>
                                <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <UserIcon size={16} />
                                        <span>{user.name}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                                <Link to="/signup" className="btn-primary py-1.5 text-sm">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
