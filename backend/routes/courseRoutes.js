const express = require("express");

const {
  getCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Courses
|--------------------------------------------------------------------------
*/

// GET /api/courses
// Get all active courses
router.get("/", getCourses);

// GET /api/courses/slug/:slug
// Get one active course by slug
router.get("/slug/:slug", getCourseBySlug);

// GET /api/courses/:id
// Get one course by MongoDB ID
// Admin can access inactive courses
router.get("/:id", getCourseById);


/*
|--------------------------------------------------------------------------
| Admin Courses
|--------------------------------------------------------------------------
*/

// POST /api/courses
router.post("/", createCourse);

// PUT /api/courses/:id
router.put("/:id", updateCourse);

// DELETE /api/courses/:id
router.delete("/:id", deleteCourse);

module.exports = router;