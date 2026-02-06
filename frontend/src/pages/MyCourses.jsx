import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Loader2, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const res = await axios.get('/api/my-courses');
                setCourses(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchMyCourses();
    }, [user]);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Learning Path</h1>

            {courses.length === 0 ? (
                <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed">
                    <h2 className="text-2xl font-semibold text-slate-400 mb-4">No courses yet</h2>
                    <p className="text-slate-500 mb-8">You haven't subscribed to any courses yet.</p>
                    <Link to="/" className="btn-primary">Browse Courses</Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {courses.map(course => (
                        <div key={course._id + course.subscribedAt} className="glass-card p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center">
                            <img src={course.thumbnail} alt={course.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />

                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-1">{course.description}</p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={16} />
                                        <span>Paid: ${course.pricePaid}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>Enrolled: {new Date(course.subscribedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-secondary w-full md:w-auto">Continue Learning</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
