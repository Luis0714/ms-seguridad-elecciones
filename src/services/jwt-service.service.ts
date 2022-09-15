import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
let jwt = require('jsonwebtoken')



@injectable({scope: BindingScope.TRANSIENT})
export class JwtServiceService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   *
   * @param info Datos que quedaran en el token
   * @returns token firmado con la clave
   */
  crearToken(info: object): string {
    try{
      let token = jwt.sign(info, Keys.JwtSecretKey)
      return token
    }catch(err){
      throw err
    }
  }
}
