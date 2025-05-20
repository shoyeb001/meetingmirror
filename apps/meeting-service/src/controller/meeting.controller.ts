import { Request, Response } from 'express';
import { Meeting } from '../model/meeting.model';
const meetingController = {
    async getAllMeetings(req: any, res: Response) {
        try {
            const userId = req.user._id;
            console.log("User ID:", userId);
            const meetings = await Meeting.find({
                userId: userId
            });
            res.status(200).json({
                isSuccess: true,
                message: "Meetings fetched successfully",
                data: meetings
            });
        } catch (error: any) {
            res.status(500).json({
                isSuccess: false,
                message: "Error fetching meetings",
                error: error.message
            });
        }
    },

    async getMeetingDetails(req: any, res: Response) {
        try {
            const meetingId = req.params.id;
            const userId = req.user._id;
            const meeting = await Meeting.findOne({
                _id: meetingId,
                userId: userId
            });
            res.status(200).json({
                isSuccess: true,
                message: "Meeting details fetched successfully",
                data: meeting
            })
        } catch (error: any) {
            res.status(500).json({
                isSuccess: false,
                message: "Error fetching meetings",
                error: error.message
            });
        }
    }
}

export default meetingController;