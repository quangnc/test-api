import { User } from 'modules/auth/entities/user.entity';
import { uploadUrl } from 'src/utils/app';

export class UserMapper {
  static mapOne(user: User): Record<string, any> {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      device: user.device,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: uploadUrl(user.avatar, 'users'),
      locale: user.locale,
      // status: user.status,
    };
  }

  static mapSimple(user: User): Record<string, any> {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: uploadUrl(user.avatar),
    };
  }

  static mapList(users: User[]): Record<string, any> {
    return users.map((u) => this.mapOne(u));
  }
}
