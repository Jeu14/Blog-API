import { ApiProperty } from '@nestjs/swagger';

export class createProfileDTO {
  @ApiProperty({
    description: 'Author profile that will be created',
    example: 'Author Profile Test 1',
  })
  description: string;
}
