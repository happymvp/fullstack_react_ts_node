import {Request, Response} from "express";
import {AppDataSource} from "@/config/ormconfig.ts";
import {Report} from "@/feature/report/entities/Report.ts";
import {validate} from "class-validator";
import multer from "multer";
import path from "path";

// File upload configuration using multer
export const uploadSingle = multer({dest: "./uploads/"}).single("file")


export const createReport = async (req: Request, res: Response) => {
        const {name, age} = req.body;

        const file = req.file ? path.join("uploads", req.file.filename) : null;

        const report = new Report();
        report.name = name;
        report.age = parseInt(age);
        report.file = file;

        const reportRepository = AppDataSource.getRepository(Report);
        await reportRepository.save(report);

        // Validate input
        const errors = await validate(report);
        if (errors.length > 0) return res.status(400).json(errors);

        await reportRepository.save(report);
        return res.status(201).json({message: "Report created", report});
};

export const getAllReports = async (req: Request, res: Response) => {
    const reportRepository = AppDataSource.getRepository(Report);
    const reports = await reportRepository.find();
    return res.status(200).json(reports);
};

export const getReportById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const reportRepository = AppDataSource.getRepository(Report);

    const report = await reportRepository.findOneBy({id: Number(id)});
    if (!report) return res.status(404).json({message: "Report not found"});

    return res.status(200).json(report);
};

export const updateReport = async (req: Request, res: Response) => {
        const {id} = req.params;
        const {name, age} = req.body;


        const file = req.file ? path.join("uploads", req.file.filename) : null;

        const reportRepository = AppDataSource.getRepository(Report);
        let report = await reportRepository.findOneBy({id: Number(id)});

        if (!report) return res.status(404).json({message: "Report not found"});

        report.name = name || report.name;
        report.age = parseInt(age) || report.age;
        report.file = file || report.file;

        await reportRepository.save(report);

        // Validate input
        const errors = await validate(report);
        if (errors.length > 0) return res.status(400).json(errors);

        await reportRepository.save(report);
        return res.status(201).json({message: "Report created", report});
};

export const deleteReport = async (req: Request, res: Response) => {
    const {id} = req.params;
    const reportRepository = AppDataSource.getRepository(Report);

    const report = await reportRepository.findOneBy({id: Number(id)});
    if (!report) return res.status(404).json({message: "Report not found"});

    await reportRepository.remove(report);
    return res.status(201).json({message: "Report deleted"});
};

