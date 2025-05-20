import express from 'express';
import transcriptController from '../controller/transcript.controller';
import upload from '../lib/multer';
import { auth } from '../middleware/auth';
import { user } from '../middleware/user';
import meetingController from '../controller/meeting.controller';
const router = express.Router();

router.post('/upload', upload.single('file'), [auth, user], transcriptController.uploadTranscript)
    .get('/all', [auth, user], meetingController.getAllMeetings)
    .get('/details/:id', [auth, user], meetingController.getMeetingDetails);

export default router;