import { ApiProperty } from "@nestjs/swagger";

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
