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
  name: string;
  email: string;
  bio: string;
  cpf: string;
  pais: string;
  description?: string
}