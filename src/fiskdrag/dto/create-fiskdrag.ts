import { IsString, IsOptional, IsNumber, Length, Min, IsNotEmpty,  IsBoolean } from 'class-validator';

export class CreateFiskDragDto {
  @IsString()
  @Length(5, 5, { message: 'artikelnummer måste vara 5 tecken.' })
  readonly artikelnummer: string;

  @IsString()
  @IsNotEmpty()
  readonly Tillverkare: string;

  @IsNumber()
  @Min(0, { message: 'måste vara ett positivt tal.' })
  readonly pris: number;

  @IsString()
  @IsOptional()
  readonly typ: string;

@IsBoolean()
@IsOptional()
readonly own:boolean;

  }