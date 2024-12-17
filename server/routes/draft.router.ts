import express from 'express';
import { rejectUnauthenticated } from '../modules/authentication-middleware';
import { handleDraft, attachPod } from '../modules/draftRouterFns/handleDraft';

const router = express.Router()

router.get('/:id', rejectUnauthenticated, attachPod, handleDraft)

router.post('/', rejectUnauthenticated, )