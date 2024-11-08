import { ApiProperty } from "@nestjs/swagger";
import * as Joi from 'joi';

export const CreatePostSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'The "title" field must be a string',
    'string.empty': 'The "title" field cannot be empty',
    'string.min': 'The "title" field must have at least 3 characters',
    'string.max': 'The "title" field can have a maximum of 100 characters',
  }),

  content: Joi.string().min(5).max(500).required().messages({
    'string.base': 'The "content" field must be a string',
    'string.empty': 'The "content" field cannot be empty',
    'string.min': 'The "content" field must have at least 5 characters',
    'string.max': 'The "content" field can have a maximum of 500 characters',
  }),

  authorId: Joi.number().integer().positive().required().messages({
    'number.base': 'The "authorId" field must be a number',
    'number.integer': 'The "authorId" field must be an integer',
    'number.positive': 'The "authorId" field must be a positive number',
    'any.required': 'The "authorId" field is required',
  }),

  categories: Joi.array().items(Joi.string().guid({ version: 'uuidv4' }).required()).min(1).required().messages({
    'array.base': 'The "categories" field must be an array',
    'array.min': 'The "categories" field must contain at least one category',
    'string.base': 'Each category in "categories" must be a string',
    'string.guid': 'Each category in "categories" must be a valid UUID',
  })
});

export class CreatePostDTO {

  @ApiProperty({
    description: 'Post title',
    example: 'World cup'
  })
  title: string;

  @ApiProperty({
    description: 'Post description',
    example: 'Matches start this week'
  })
  content: string;

  @ApiProperty({
    description: 'ID of the author who will make the post',
    example: 1
  })
  authorId: number;

  @ApiProperty({
    description: 'ID of the categories that will be assigned to the post',
    example: [
      "9c855a8f-0644-4168-b63e-33e507a22296",
      "294f7920-702d-44e1-99db-1160fead1b06"
    ]
  })
  categories: string[];
}
