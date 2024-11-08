import { ApiProperty } from "@nestjs/swagger";

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
