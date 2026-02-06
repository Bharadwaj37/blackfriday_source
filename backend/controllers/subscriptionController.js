const Subscription = require('../models/Subscription');
const Course = require('../models/Course');

exports.subscribe = async (req, res) => {
    try {
        const { courseId, promoCode } = req.body;
        const userId = req.user.userId;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Check if already subscribed
        const existingSub = await Subscription.findOne({ userId, courseId });
        if (existingSub) return res.status(400).json({ message: 'Already subscribed' });

        let finalPrice = course.price;

        if (course.type === 'paid') {
            if (promoCode === 'BFSALE25') {
                finalPrice = course.price * 0.5; // 50% discount
            } else if (promoCode) {
                return res.status(400).json({ message: 'Invalid promo code' });
            } else {
                // No promo code, full price. (Frontend should enforce promo if mandatory? Prompt says "Show Subscribe button (disabled until promo is validated)" - wait. 
                // "If paid... Show Promo code input... Subscribe button (disabled until promo is validated)"
                // Actually, usually you can buy without promo. But user requirement says: "If paid -> ensure promo code is provided". 
                // Wait. "If paid -> ensure promo code is provided". 
                // "Validate promo: Only BFSALE25 gives 50% discount".
                // Does this mean you CANNOT buy without a promo code? The prompt says "ensure promo code is provided".
                // I will enforce `promoCode` requirement for paid courses as per strict reading.
                if (!promoCode) {
                    return res.status(400).json({ message: 'Promo code required for paid courses' });
                }
                // Also "Only BFSALE25 gives 50% discount" - does that mean other codes are invalid? Yes.
                if (promoCode !== 'BFSALE25') {
                    return res.status(400).json({ message: 'Invalid promo code' });
                }
                // So effectively, you CAN ONLY buy with BFSALE25 for now.
                finalPrice = course.price * 0.5;
            }
        } else {
            finalPrice = 0;
        }

        const subscription = new Subscription({
            userId,
            courseId,
            pricePaid: finalPrice
        });

        await subscription.save();
        res.status(201).json({ message: 'Subscribed successfully', subscription });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMyCourses = async (req, res) => {
    try {
        const userId = req.user.userId;
        // Populate course details
        const subscriptions = await Subscription.find({ userId }).populate('courseId');

        // Transform to return course details + sub info
        const data = subscriptions.map(sub => ({
            ...sub.courseId._doc,
            pricePaid: sub.pricePaid,
            subscribedAt: sub.subscribedAt
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
