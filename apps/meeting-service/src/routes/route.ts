import express from 'express';
import transcriptController from '../controller/transcript.controller';
import upload from '../lib/multer';
import { auth } from '../middleware/auth';
import { user } from '../middleware/user';
const router = express.Router();

router.post('/upload', upload.single('file'), [auth, user], transcriptController.uploadTranscript);

export default router;