import { ApiProperty } from "@nestjs/swagger";
import * as Joi from 'joi';

export const CreateCategorySchema = Joi.object({
  names: Joi.array().items(Joi.string().required()).min(1).required()
  .messages({
    'array.base': 'The "names" field must be an array of strings',
    'array.min': 'The "names" field must contain at least one category',
    'array.empty': 'The "names" field cannot be empty',
    'string.base': 'Each item in "names" must be a string',
  })
})

export class CreateCategoryDTO {

  @ApiProperty({
    description: 'Array with the name of the categories that will be registered',
    example: [
      "Esporte",
      "Saude",
      "Diversão"
    ]
  })
  names: string[];
}
