const Course = require("../models/Course");
const slugify = require("../utils/slugify");

/*
|--------------------------------------------------------------------------
| Helper: Build unique slug
|--------------------------------------------------------------------------
*/

async function createUniqueSlug(name, excludeId = null) {
  const baseSlug = slugify(name);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingCourse = await Course.findOne(query);

    if (!existingCourse) {
      return slug;
    }

    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

/*
|--------------------------------------------------------------------------
| GET /api/courses
| Public
|--------------------------------------------------------------------------
*/

const getCourses = async (req, res, next) => {
  try {
    const {
      search = "",
      category,
      level,
      featured,
      page = 1,
      limit = 12,
    } = req.query;

    const pageNumber = Math.max(Number(page) || 1, 1);

    const limitNumber = Math.min(
      Math.max(Number(limit) || 12, 1),
      50
    );

    /*
    |--------------------------------------------------------------------------
    | Public courses must always be active
    |--------------------------------------------------------------------------
    */

    const filter = {
      isActive: true,
    };

    /*
    |--------------------------------------------------------------------------
    | Category filter
    |--------------------------------------------------------------------------
    */

    if (
      category &&
      category.trim() !== "" &&
      category !== "All"
    ) {
      filter.category = category;
    }

    /*
    |--------------------------------------------------------------------------
    | Level filter
    |--------------------------------------------------------------------------
    */

    if (
      level &&
      level.trim() !== "" &&
      level !== "All"
    ) {
      filter.level = level;
    }

    /*
    |--------------------------------------------------------------------------
    | Featured filter
    |--------------------------------------------------------------------------
    */

    if (featured === "true") {
      filter.featured = true;
    }

    /*
    |--------------------------------------------------------------------------
    | Search
    |
    | Use regex instead of MongoDB $text so searches such as:
    | "alp", "alpha", "apna", "college"
    | all work correctly.
    |--------------------------------------------------------------------------
    */

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      const searchRegex = new RegExp(
        trimmedSearch.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        ),
        "i"
      );

      filter.$or = [
        {
          name: searchRegex,
        },
        {
          shortDescription: searchRegex,
        },
        {
          description: searchRegex,
        },
        {
          category: searchRegex,
        },
        {
          level: searchRegex,
        },
        {
          duration: searchRegex,
        },
        {
          technologies: searchRegex,
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const skip = (pageNumber - 1) * limitNumber;

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .sort({
          featured: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Course.countDocuments(filter),
    ]);

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| GET /api/courses/:id
| Public
|--------------------------------------------------------------------------
*/

const getCourseById = async (req, res, next) => {
  try {
    const isAdminRequest = Boolean(req.admin);

    const filter = {
      _id: req.params.id,
    };

    /*
    |--------------------------------------------------------------------------
    | Public users can only see active courses.
    | Admin users can see both active and inactive courses.
    |--------------------------------------------------------------------------
    */

    if (!isAdminRequest) {
      filter.isActive = true;
    }

    const course = await Course.findOne(filter).lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| GET /api/courses/slug/:slug
| Public
|--------------------------------------------------------------------------
*/

const getCourseBySlug = async (req, res, next) => {
  try {
    const isAdminRequest = Boolean(req.admin);

    const filter = {
      slug: req.params.slug,
    };

    /*
    |--------------------------------------------------------------------------
    | Public users can only see active courses.
    | Admin users can see inactive courses too.
    |--------------------------------------------------------------------------
    */

    if (!isAdminRequest) {
      filter.isActive = true;
    }

    const course = await Course.findOne(filter).lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| POST /api/courses
| Admin only
|--------------------------------------------------------------------------
*/

const createCourse = async (req, res, next) => {
  try {
    const {
      name,
      shortDescription,
      description,
      image,
      fee,
      duration,
      level,
      category,
      learningOutcomes,
      syllabus,
      technologies,
      prerequisites,
      certificate,
      featured,
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    if (
      !name ||
      !shortDescription ||
      !description ||
      fee === undefined ||
      !duration ||
      !level ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, short description, description, fee, duration, level and category are required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create unique slug
    |--------------------------------------------------------------------------
    */

    const slug = await createUniqueSlug(name);

    /*
    |--------------------------------------------------------------------------
    | Create course
    |--------------------------------------------------------------------------
    */

    const course = await Course.create({
      name,
      slug,
      shortDescription,
      description,
      image: image || "",
      fee,
      duration,
      level,
      category,

      learningOutcomes: Array.isArray(learningOutcomes)
        ? learningOutcomes
        : [],

      syllabus: Array.isArray(syllabus)
        ? syllabus
        : [],

      technologies: Array.isArray(technologies)
        ? technologies
        : [],

      prerequisites: Array.isArray(prerequisites)
        ? prerequisites
        : [],

      certificate: Boolean(certificate),

      featured: Boolean(featured),

      isActive:
        typeof isActive === "boolean"
          ? isActive
          : true,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully.",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| PUT /api/courses/:id
| Admin only
|--------------------------------------------------------------------------
*/

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const allowedFields = [
      "name",
      "shortDescription",
      "description",
      "image",
      "fee",
      "duration",
      "level",
      "category",
      "learningOutcomes",
      "syllabus",
      "technologies",
      "prerequisites",
      "certificate",
      "featured",
      "isActive",
    ];

    /*
    |--------------------------------------------------------------------------
    | Update allowed fields
    |--------------------------------------------------------------------------
    */

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        course[field] = req.body[field];
      }
    });

    /*
    |--------------------------------------------------------------------------
    | Update slug when course name changes
    |--------------------------------------------------------------------------
    */

    if (req.body.name !== undefined) {
      course.slug = await createUniqueSlug(
        req.body.name,
        course._id
      );
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| DELETE /api/courses/:id
| Admin only
|--------------------------------------------------------------------------
*/

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = {
  getCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
};