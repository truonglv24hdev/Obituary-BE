import { IsNotEmpty, IsDate, IsEmail } from "class-validator";

export default class RSVPDto {
  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  public last_name: string | undefined;

  @IsNotEmpty()
  public verification: boolean | undefined;

  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  public contact: string | undefined;

  @IsNotEmpty()
  @IsDate()
  public date: Date | undefined;
}
