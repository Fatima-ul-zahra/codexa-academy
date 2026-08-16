const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getDashboardStats = async (
  req,
  res,
  next
) => {
  try {
    const [
      totalCourses,
      activeCourses,
      inactiveCourses,
      featuredCourses,
      totalEnrollments,
      recentCourses,
      recentEnrollments,
    ] = await Promise.all([
      Course.countDocuments(),

      Course.countDocuments({
        isActive: true,
      }),

      Course.countDocuments({
        isActive: false,
      }),

      Course.countDocuments({
        featured: true,
        isActive: true,
      }),

      Enrollment.countDocuments(),

      Course.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          "name slug fee duration level category featured isActive createdAt image"
        )
        .lean(),

      Enrollment.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .populate(
          "course",
          "name slug"
        )
        .select(
          "studentName phone email course status createdAt"
        )
        .lean(),
    ]);

    res.status(200).json({
      success: true,

      data: {
        totalCourses,
        activeCourses,
        inactiveCourses,
        featuredCourses,
        totalEnrollments,
        recentCourses,
        recentEnrollments,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};