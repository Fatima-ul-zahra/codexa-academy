const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const VALID_STATUSES = [
  "Pending",
  "Contacted",
  "Enrolled",
  "Completed",
  "Cancelled",
];


const createEnrollment = async (req, res, next) => {
  try {
    const {
      studentName,
      phone,
      email,
      course,
      education,
      city,
      message,
    } = req.body;

    if (
      !studentName ||
      !phone ||
      !email ||
      !course ||
      !education ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required enrollment information.",
      });
    }

    const enrollment =
      await Enrollment.create({
        studentName: studentName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        course,
        education: education.trim(),
        city: city.trim(),
        message: message?.trim() || "",
        status: "Pending",
      });

    res.status(201).json({
      success: true,
      message:
        "Enrollment submitted successfully.",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get all enrollments
|--------------------------------------------------------------------------
*/

const getEnrollments = async (req, res, next) => {
  try {
    const {
      search = "",
      course = "",
      status = "",
      page = 1,
      limit = 20,
    } = req.query;

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const perPage = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    const filter = {};

    if (status && VALID_STATUSES.includes(status)) {
      filter.status = status;
    }

    if (course) {
      filter.course = course;
    }

    if (search.trim()) {
      const searchRegex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        {
          studentName: searchRegex,
        },
        {
          phone: searchRegex,
        },
        {
          email: searchRegex,
        },
        {
          city: searchRegex,
        },
      ];
    }

    const skip =
      (currentPage - 1) * perPage;

    const [
      enrollments,
      total,
    ] = await Promise.all([
      Enrollment.find(filter)
        .populate(
          "course",
          "name slug fee duration level"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(perPage)
        .lean(),

      Enrollment.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,

      data: enrollments,

      pagination: {
        total,
        page: currentPage,
        limit: perPage,
        pages: Math.ceil(
          total / perPage
        ),
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get single enrollment
|--------------------------------------------------------------------------
*/

const getEnrollmentById = async (
  req,
  res,
  next
) => {
  try {
    const enrollment =
      await Enrollment.findById(
        req.params.id
      )
        .populate(
          "course",
          "name slug fee duration level category"
        )
        .lean();

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update enrollment status
|--------------------------------------------------------------------------
*/

const updateEnrollmentStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid enrollment status.",
      });
    }

    const enrollment =
      await Enrollment.findByIdAndUpdate(
        req.params.id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "course",
          "name slug fee duration level"
        )
        .lean();

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Enrollment status updated successfully.",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete enrollment
|--------------------------------------------------------------------------
*/

const deleteEnrollment = async (
  req,
  res,
  next
) => {
  try {
    const enrollment =
      await Enrollment.findByIdAndDelete(
        req.params.id
      );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Enrollment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enrollment statistics
|--------------------------------------------------------------------------
*/

const getEnrollmentStats = async (
  req,
  res,
  next
) => {
  try {
    const [
      total,
      pending,
      contacted,
      enrolled,
      completed,
      cancelled,
    ] = await Promise.all([
      Enrollment.countDocuments(),

      Enrollment.countDocuments({
        status: "Pending",
      }),

      Enrollment.countDocuments({
        status: "Contacted",
      }),

      Enrollment.countDocuments({
        status: "Enrolled",
      }),

      Enrollment.countDocuments({
        status: "Completed",
      }),

      Enrollment.countDocuments({
        status: "Cancelled",
      }),
    ]);

    res.status(200).json({
      success: true,

      data: {
        total,
        pending,
        contacted,
        enrolled,
        completed,
        cancelled,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentStats,
};