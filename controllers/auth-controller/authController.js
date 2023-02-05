import { response } from 'express';
import User from './../../models/User.js';
import bcrypt from 'bcryptjs'
import generarJWT from '../../helpers/jwt.js';

export const register = async (req, res = response) => {
  const { name, email, pwd } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario registrado',
      });
    }

    const dbUser = new User(req.body);

    const salt = bcrypt.genSaltSync();
    dbUser.pwd = bcrypt.hashSync( pwd , salt);

    const token = await generarJWT(dbUser.id , dbUser.name);

    dbUser.save();

    return res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name,
      token,
    }); 

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: `Error ${error}`,
    });
  }
};

export const login = async (req, res = response) => {
  const { email, pwd } = req.body;

  try {
    const dbUser = await User.findOne({email});
    if(!dbUser){
      return res.status(400).json({
        ok: false,
        msg: `Credenciales Incorrectas`,
      });
    }

    //Confirmar el pwd
    const validPwd = bcrypt.compare(pwd , dbUser.pwd);

    if(!validPwd){
      return res.status(400).json({
        ok: false,
        msg: `Credenciales Incorrectas`,
      });
    }

    //Usuario y pwd validos

    const token = await generarJWT(dbUser.uid , dbUser.name);

    return res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token,
    }); 

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Habla con el administrador',
    });
  }

};

export const renew = (req, res = response) => {
  const { email, pwd } = req;
  return res.json({
    ok: true,
    msg: 'Renovar Usuario',
  });
};
