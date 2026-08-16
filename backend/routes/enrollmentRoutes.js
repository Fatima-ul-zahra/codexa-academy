const express = require("express");

const {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentStats,
} = require("../controllers/enrollmentController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTE
|--------------------------------------------------------------------------
| Students can submit enrollment information
| without being logged in.
*/

router.post("/", createEnrollment);

/*
|--------------------------------------------------------------------------
| ADMIN-ONLY ROUTES
|--------------------------------------------------------------------------
| Everything below this point requires authentication.
*/

router.use(protect);

router.get(
  "/stats",
  getEnrollmentStats
);

router.get(
  "/",
  getEnrollments
);

router.get(
  "/:id",
  getEnrollmentById
);

router.patch(
  "/:id/status",
  updateEnrollmentStatus
);

router.delete(
  "/:id",
  deleteEnrollment
);

module.exports = router;