import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {report} from 'process';
import {CredencialCambioContrasena, CredencialesLogin} from '../models';
import {UsuarioRepository} from '../repositories';
import {JwtServiceService} from './jwt-service.service';
var generator = require('generate-password');
var MD5 = require("crypto-js/md5");

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadUsuarioService {
  constructor(
  @repository(UsuarioRepository)
  private UsuarioRepository: UsuarioRepository,
  @service(JwtServiceService)
  private jWtService: JwtServiceService
  ){}

  async IdentificarUSuario(Credenciales:CredencialesLogin):Promise<string>{
    let response = "";
    let usuario = await this.UsuarioRepository.findOne({
      where:{
        Correo: Credenciales.NombreUsuario,
        Clave: Credenciales.Clave
      }
    });
    console.log(usuario)
    if(usuario){
      //Creacion del Token y asignar valor a response
      let datos = {
        nombre: `${usuario.Nombres} ${usuario.Apellido}`,
        correo: usuario.Correo,
        rol: usuario.rolId
      }
      try{
        response = this.jWtService.crearToken(datos);
        console.log(response);
      }catch(err){
        throw err
      }
    }
    return response;
  }

  async IdentificarUSuarioCambioContraseña(Credenciales:CredencialCambioContrasena):Promise<string>{
    let response = "";
    let usuario = await this.UsuarioRepository.findOne({
      where:{
        Correo: Credenciales.usuario,
      }
    });
    console.log(usuario)
    if(usuario){
      //Creacion del Token y asignar valor a response
      let datos = {
        nombre: `${usuario.Nombres} ${usuario.Apellido}`,
        correo: usuario.Correo,
        rol: usuario.rolId
      }
      try{
        response = this.jWtService.crearToken(datos);
        console.log(response);
      }catch(err){
        throw err
      }
    }
    return response;
  }
  cifrarClave(clave:string):string{
    return MD5(clave).toString();
  }

  generarClaveAleatoria():string{
    let password = generator.generate({
      length: 10,
      numbers: true,
      Symbols: true,
      uppercase: true
    });
    return password
  }
}
