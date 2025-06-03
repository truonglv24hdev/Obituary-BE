import { IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(6, { message: "Password is too short" })
  @MaxLength(20,{ message: "Password is too long" })
  public password: string | undefined;
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(6, { message: "Password is too short" })
  @MaxLength(20,{ message: "Password is too long" })
  public password: string | undefined;
}
