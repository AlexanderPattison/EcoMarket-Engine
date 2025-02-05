import { IsString, IsNumber, MinLength, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsNumber()
    @Min(0.01, { message: 'Price must be at least 0.01' })
    price: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsUrl()
    imageUrl: string;
}