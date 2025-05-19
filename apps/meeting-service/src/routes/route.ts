import express from 'express';
import transcriptController from '../controller/transcript.controller';
import upload from '../lib/multer';
const router = express.Router();

router.post('/upload', upload.single('file'), transcriptController.uploadTranscript);

export default router;