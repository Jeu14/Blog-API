import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const DeletePostSchema = Joi.object({
    postId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'The "postID" field must be a string',
    'string.guid': 'The "postID" field must be a valid UUID',
    'any.required': 'The "postID" field is required',
    'string.empty': 'The "postID" field is required'
  }),
});

export class DeletePostDTO {

  @ApiProperty({
    description: 'ID of the post that will be deleted',
    example: '99232988-33da-4b19-8a7f-2d69d438f13d'
  })
  postId: string;
}
