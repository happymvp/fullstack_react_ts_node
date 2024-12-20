import {Router} from "express";
import {
    createReport,
    deleteReport,
    getAllReports,
    getReportById,
    updateReport,
    uploadSingle
} from "@/feature/report/controller.ts";

const router = Router();

router.post("/report",uploadSingle, createReport);
router.get("/report", getAllReports);
router.get("/report/:id", getReportById);
router.put("/report/:id", uploadSingle, updateReport);
router.delete("/report/:id", deleteReport);

export default router;
