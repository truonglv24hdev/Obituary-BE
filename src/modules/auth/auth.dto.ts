import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(8, { message: "Password is too short" })
  public password: string | undefined;
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(8, { message: "password is too short" })
  public password: string | undefined;
}
