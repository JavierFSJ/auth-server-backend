import { Router } from 'express';
import {
  login,
  register,
  renew,
} from '../controllers/auth-controller/authController.js';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validator.js';

export const router = Router();

/*======================================
  Routes: Auth-app
=======================================*/

router.post(
  '/new',
  [
    check('name', 'El nombre es requerido').notEmpty(),
    check('email', 'El email es requerido').notEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('pwd', 'La contraseña es requerida').notEmpty(),
    check('pwd', 'La contraseña debe ser de mayor a seis caracteres').isLength(6),
    validarCampos
  ],
  register
);

router.post(
  '/',
  [
    check('email', 'El email no valido').isEmail(),
    check('pwd', 'La contraseña es obligatoria').isLength(6),
    validarCampos,
  ],
  login
);

router.get('/renew', renew);
