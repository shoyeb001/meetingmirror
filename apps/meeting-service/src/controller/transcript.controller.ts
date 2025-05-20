import { NextFunction, Response } from "express";
import Joi from "joi";
import fs from "fs";
import PdfParse from "pdf-parse";
import { Meeting } from "../model/meeting.model";
import { publishToQueue } from "../lib/rabbbitmq";
const transcriptController = {
    async uploadTranscript(req: any, res: Response, next: NextFunction) {
        const transcriptSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            source: Joi.string().valid('zoom', 'google-meet', 'others').required(),
        });
        const { error } = transcriptSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        const { title, description, source } = req.body;
        console.log(req.body, "body")
        const file = req.file;
        console.log("File: ", file);
        let dataBuffer = fs.readFileSync(file.path);
        const data = await PdfParse(dataBuffer);
        const transcriptText = data.text;
        const fileUrl = file.path;
        console.log("Transcript Text: ", transcriptText);
        const meetingData = new Meeting({
            userId: req.user._id,
            title,
            description,
            transcriptText,
            fileUrl,
            source,
        });
        await meetingData.save();
        publishToQueue('transcript_uploaded', {
            meetingId: meetingData._id,
            data: transcriptText
        });
        res.status(200).json({
            isSuccess: true,
            message: "Transcript uploaded successfully",
            data: {
                meetingId: meetingData._id,
                title: meetingData.title,
                description: meetingData.description,
                fileUrl: meetingData.fileUrl,
                source: meetingData.source,
                status: meetingData.status,
            }
        })
    }
}
export default transcriptController;