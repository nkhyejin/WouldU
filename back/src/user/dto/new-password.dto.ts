import { IsEmail } from 'class-validator';

export class NewPasswordDTO {
  /**
   *
   * @example 'email@email.com'
   */
  @IsEmail()
  email: string;
}
