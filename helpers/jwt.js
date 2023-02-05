import jwt from 'jsonwebtoken';


const generarJWT = (uid , name) => {
  
  // payload
  const payload = {uid , name};

  return new Promise( (resolve , reject) => {
    jwt.sign(payload , process.env.SECRET_JWT_SEED , {
      expiresIn: '12h',
    } , (error , token) => {
      if(error){
        console.log(error);
        reject(error);
      } else {
        resolve(token);
      }
    });
  })



}


export default generarJWT; 

