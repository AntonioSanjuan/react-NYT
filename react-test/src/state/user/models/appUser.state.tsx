import { UserResponseDto } from "../../../models/dtos/user/user.model";

export interface UserState {
  isLogged: boolean;
  userData: UserResponseDto | undefined;
}
