import { Router } from 'express';
import { celebrate , Segments , Joi} from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const upload = multer(uploadConfig.multer);
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  }
}) ,profileController.update);


export default profileRouter;