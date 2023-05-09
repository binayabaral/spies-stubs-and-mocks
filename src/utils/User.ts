import { send } from './Email';

export function setupNewUser(info: { name: string }, callback: (err: any) => void) {
  var user = {
    name: info.name,
    nameLowerCase: info.name.toLowerCase()
  };

  try {
    return send(user);
  } catch (err) {
    callback(err);
  }
}
