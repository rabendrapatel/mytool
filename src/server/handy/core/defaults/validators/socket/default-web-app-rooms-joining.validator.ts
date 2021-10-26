import { NextFn, HandySocketServerEventPayload } from "@handy/types";

export const DefaultWebAppRoomsJoiningAccessValidator = (socket: SocketIO.Socket, packet: SocketIO.Packet, next: NextFn) => {

  let data: HandySocketServerEventPayload = packet[1];

  if (!data) {
    return next();
  }

  let requestedRooms: string[] = packet[1].eventData;
  if (!requestedRooms) {
    return next();
  }

  let allowedRooms: string[] = [];
  let divceIdRoomPrefix: string = 'web_device_id_';
  let userIdRoomPrefix: string = 'user_id_';
  let userEmailRoomPrefix: string = 'user_email_';
  let groupIdRoomPrefix: string = 'users_group_id_';

  let requestedRoomslLen: number = requestedRooms.length;
  for (let i = 0; i < requestedRoomslLen; i++) {
    const singleRequestedRoom = requestedRooms[i];

    if (singleRequestedRoom.startsWith(divceIdRoomPrefix)) {

      let requesteDeviceId: string = singleRequestedRoom.replace(divceIdRoomPrefix, '');

      if (socket.request.deviceIdCookie === requesteDeviceId) {
        allowedRooms.push(singleRequestedRoom);
      }

      continue;

    }

    if (isNotEmpty(data.user.email) && singleRequestedRoom.startsWith(userEmailRoomPrefix)) {

      let requesteUserEmail: string = singleRequestedRoom.replace(userEmailRoomPrefix, '');

      if (data.user.email === requesteUserEmail) {
        allowedRooms.push(singleRequestedRoom);
      }

      continue;

    }

    if (isNotEmpty(data.user._id) && singleRequestedRoom.startsWith(userIdRoomPrefix)) {

      let requesteUserId: string = singleRequestedRoom.replace(userIdRoomPrefix, '');

      if (data.user._id.toString() === requesteUserId) {
        allowedRooms.push(singleRequestedRoom);
      }

      continue;

    }

    if (isNotEmpty(data.user.groupId) && singleRequestedRoom.startsWith(groupIdRoomPrefix)) {

      let requesteUserGroupId: string = singleRequestedRoom.replace(groupIdRoomPrefix, '');

      if (data.user.groupId.toString() === requesteUserGroupId) {
        allowedRooms.push(singleRequestedRoom);
      }

      continue;

    }

    allowedRooms.push(singleRequestedRoom);

  }

  packet[1].eventData = allowedRooms;

  return next();

}