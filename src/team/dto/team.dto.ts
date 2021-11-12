import { ApiProperty } from "@nestjs/swagger";

export class TeamDto{
    @ApiProperty()
    id:String
    @ApiProperty()
    name:String
    
    @ApiProperty()
    bio:String
    @ApiProperty()
    image:String
    
    @ApiProperty()
    role:String
    @ApiProperty()
    country:String
}