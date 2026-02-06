import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';

export default function CourseCard({ course }) {
    return (
        <div className="glass-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold border border-slate-700">
                    {course.price === 0 ? (
                        <span className="text-green-400">Free</span>
                    ) : (
                        <span className="text-secondary">${course.price}</span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>

                <Link
                    to={`/course/${course._id}`}
                    className="mt-auto w-full btn-secondary text-center py-2.5 hover:from-primary hover:to-primary-dark hover:bg-gradient-to-r transition-all"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
