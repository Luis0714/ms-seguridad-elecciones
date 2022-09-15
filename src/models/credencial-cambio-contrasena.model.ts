import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialCambioContrasena extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;


  constructor(data?: Partial<CredencialCambioContrasena>) {
    super(data);
  }
}

export interface CredencialCambioContrasenaRelations {
  // describe navigational properties here
}

export type CredencialCambioContrasenaWithRelations = CredencialCambioContrasena & CredencialCambioContrasenaRelations;
