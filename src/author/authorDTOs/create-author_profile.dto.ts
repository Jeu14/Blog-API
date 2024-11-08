import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const CreateProfileSchema = Joi.object({
  description: Joi.string().required()
  .messages({
    'string.empty': 'The description field is required',
  })
})

export class createProfileDTO {
  @ApiProperty({
    description: 'Author profile that will be created',
    example: 'Author Profile Test 1',
  })
  description: string;
}
