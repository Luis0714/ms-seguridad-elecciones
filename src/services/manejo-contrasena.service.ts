import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import {model, repository} from '@loopback/repository';
import {report} from 'process';
import {UsuarioController} from '../controllers';
import {CredencialCambioContrasena, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {SeguridadUsuarioService} from './seguridad-usuario.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ManejoContrasenaService {
  constructor(
     @repository(UsuarioRepository)
     private UsuarioRepository:UsuarioRepository,
     @service(SeguridadUsuarioService)
     private seguridad:SeguridadUsuarioService,
    ) {}
    /**
     *
     * @param credencial Credencial del usuario a cambiar la contraseña
     * @returns promesa si se recupero
     */
   async recuperarContraseña(credencial:CredencialCambioContrasena):Promise<string>{
    let respuesta = '';
    let contraseñaGenerada = '';
    let contraseñaCifrada = '';

    let token = await this.seguridad.IdentificarUSuarioCambioContraseña(credencial);
    if(token){
      contraseñaGenerada = this.seguridad.generarClaveAleatoria();
      contraseñaCifrada = this.seguridad.cifrarClave(contraseñaGenerada);
      this.actualizarContraseñabd(contraseñaCifrada,credencial);
    }else{
      respuesta = 'Usuario no registrado...'
    }
    return respuesta;
   }

   async actualizarContraseñabd(contraseñaCifrada:string, credencial: CredencialCambioContrasena):Promise<string>{
    let response = '';
    let usuarioPorActualizar = await this.UsuarioRepository.findOne({
      where:{
        Correo: credencial.usuario
      }
    });
    if(usuarioPorActualizar){
      usuarioPorActualizar.Clave = contraseñaCifrada;
      this.UsuarioRepository.updateById(usuarioPorActualizar._id, usuarioPorActualizar)
    }

    return '';
   }
}
