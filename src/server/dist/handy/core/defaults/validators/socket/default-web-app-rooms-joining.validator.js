"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWebAppRoomsJoiningAccessValidator = void 0;
const DefaultWebAppRoomsJoiningAccessValidator = (socket, packet, next) => {
    let data = packet[1];
    if (!data) {
        return next();
    }
    let requestedRooms = packet[1].eventData;
    if (!requestedRooms) {
        return next();
    }
    let allowedRooms = [];
    let divceIdRoomPrefix = 'web_device_id_';
    let userIdRoomPrefix = 'user_id_';
    let userEmailRoomPrefix = 'user_email_';
    let groupIdRoomPrefix = 'users_group_id_';
    let requestedRoomslLen = requestedRooms.length;
    for (let i = 0; i < requestedRoomslLen; i++) {
        const singleRequestedRoom = requestedRooms[i];
        if (singleRequestedRoom.startsWith(divceIdRoomPrefix)) {
            let requesteDeviceId = singleRequestedRoom.replace(divceIdRoomPrefix, '');
            if (socket.request.deviceIdCookie === requesteDeviceId) {
                allowedRooms.push(singleRequestedRoom);
            }
            continue;
        }
        if (isNotEmpty(data.user.email) && singleRequestedRoom.startsWith(userEmailRoomPrefix)) {
            let requesteUserEmail = singleRequestedRoom.replace(userEmailRoomPrefix, '');
            if (data.user.email === requesteUserEmail) {
                allowedRooms.push(singleRequestedRoom);
            }
            continue;
        }
        if (isNotEmpty(data.user._id) && singleRequestedRoom.startsWith(userIdRoomPrefix)) {
            let requesteUserId = singleRequestedRoom.replace(userIdRoomPrefix, '');
            if (data.user._id.toString() === requesteUserId) {
                allowedRooms.push(singleRequestedRoom);
            }
            continue;
        }
        if (isNotEmpty(data.user.groupId) && singleRequestedRoom.startsWith(groupIdRoomPrefix)) {
            let requesteUserGroupId = singleRequestedRoom.replace(groupIdRoomPrefix, '');
            if (data.user.groupId.toString() === requesteUserGroupId) {
                allowedRooms.push(singleRequestedRoom);
            }
            continue;
        }
        allowedRooms.push(singleRequestedRoom);
    }
    packet[1].eventData = allowedRooms;
    return next();
};
exports.DefaultWebAppRoomsJoiningAccessValidator = DefaultWebAppRoomsJoiningAccessValidator;
//# sourceMappingURL=default-web-app-rooms-joining.validator.js.map