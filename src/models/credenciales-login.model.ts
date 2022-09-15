import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesLogin extends Model {
  @property({
    type: 'string',
    required: true,
  })
  NombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  Clave: string;


  constructor(data?: Partial<CredencialesLogin>) {
    super(data);
  }
}

export interface CredencialesLoginRelations {
  // describe navigational properties here
}

export type CredencialesLoginWithRelations = CredencialesLogin & CredencialesLoginRelations;
