import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import { Loader2 } from 'lucide-react';

export default function Home() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('/api/courses');
                setCourses(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Unlock Your Potential
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Master the latest technologies with our premium courses.
                    <span className="block mt-2 text-secondary font-semibold">
                        Black Friday Sale: Use code BFSALE25 for 50% OFF!
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
}
