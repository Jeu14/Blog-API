import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { isCPF } from "validation-br";

export const CreateAuthorSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().optional(),
  cpf: Joi.string()
  .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF format')
    .required()
    .custom((value, helpers) => {
      if (!isCPF(value)) {
        return helpers.error('any.invalid');
      }
      return value
    }, 'CPF Validation')
    .messages({
      'any.invalid': 'Invalid CPF',
      'string.pattern.name': 'CPF must be in the format 000.000.000-00',
      'string.empty': 'CPF is required',
    }),
  pais: Joi.string().min(2).max(2).required().
  messages({
    'string.max': 'The "pais" field must be exactly 2 characters long. EX: BR (BRAZIL)',
    'string.min': 'The "pais" field must be exactly 2 characters long. EX: BR (BRAZIL)',
    'string.empty': 'The "pais" field is required',
  }),
  description: Joi.string().optional()
})
 
export class CreateAuthorDTO {

  @ApiProperty({
    description: 'Name of the author that will be created',
    example: 'John Doe'
  })
  name: string;


  @ApiProperty({
    description: 'Author email that will be created',
    example: 'johndoe@email.com'
  })
  email: string;


  @ApiProperty({
    description: 'Author bio that will be created',
    example: 'climate expert'
  })
  bio: string;


  @ApiProperty({
    description: 'Author cpf that will be created',
    example: '315.510.170-91'
  })
  cpf: string;


  @ApiProperty({
    description: 'Country of the author that will be created',
    example: 'BR'
  })
  pais: string;


  @ApiProperty({
    description: 'Author profile that will be created',
    example: 'Author Profile Test 1'
  })
  description?: string
}