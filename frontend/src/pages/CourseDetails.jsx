import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Loader2, CheckCircle, Tag, AlertCircle } from 'lucide-react';

export default function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`/api/courses/${id}`);
                setCourse(res.data);
            } catch (err) {
                console.error(err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id, navigate]);

    const handleApplyPromo = () => {
        if (promoCode === 'BFSALE25') {
            setDiscountApplied(true);
            setError('');
        } else {
            setError('Invalid Promo Code');
            setDiscountApplied(false);
        }
    };

    const handleSubscribe = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            await axios.post('/api/subscribe', {
                courseId: course._id,
                promoCode: discountApplied ? 'BFSALE25' : null
            });
            navigate('/my-courses');
        } catch (err) {
            setError(err.response?.data?.message || 'Subscription failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin text-primary" /></div>;
    if (!course) return null;

    const finalPrice = discountApplied ? (course.price * 0.5).toFixed(2) : course.price;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                <div className="h-64 sm:h-80 relative">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <h1 className="absolute bottom-6 left-6 sm:left-10 text-3xl sm:text-4xl font-bold text-white max-w-2xl">{course.title}</h1>
                </div>

                <div className="p-6 sm:p-10 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-slate-200">About this course</h2>
                        <p className="text-slate-400 leading-relaxed text-lg">{course.description}</p>
                    </div>

                    <div className="border-t border-slate-700/50 pt-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-sm text-slate-400 mb-1">Price</p>
                                <div className="flex items-baseline gap-2">
                                    {discountApplied && <span className="text-xl text-slate-500 line-through">${course.price}</span>}
                                    <span className="text-4xl font-bold text-white">
                                        {course.price === 0 ? 'Free' : `$${finalPrice}`}
                                    </span>
                                    {discountApplied && <span className="text-sm text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded">50% OFF Applied</span>}
                                </div>
                            </div>

                            {course.price > 0 && !discountApplied && (
                                <div className="w-full sm:w-auto flex-1 max-w-sm">
                                    <label className="text-sm text-slate-400 mb-1 block">Have a promo code?</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                            placeholder="Enter Code"
                                            className="input-field"
                                        />
                                        <button onClick={handleApplyPromo} className="btn-secondary whitespace-nowrap">Apply</button>
                                    </div>
                                    {error && !submitting && <p className="text-red-400 text-sm mt-1">{error}</p>}
                                </div>
                            )}
                        </div>

                        <div className="mt-8">
                            {course.price > 0 && !discountApplied ? (
                                <button disabled className="w-full py-4 rounded-xl bg-slate-800 text-slate-500 font-bold cursor-not-allowed">
                                    Apply Promo Code to Subscribe
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubscribe}
                                    disabled={submitting}
                                    className="w-full btn-primary py-4 text-lg shadow-xl shadow-primary/25"
                                >
                                    {submitting ? <Loader2 className="animate-spin mx-auto" /> : (
                                        course.price === 0 ? 'Start Learning for Free' : `Enroll Now for $${finalPrice}`
                                    )}
                                </button>
                            )}
                            {error && submitting && <div className="mt-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-center">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
