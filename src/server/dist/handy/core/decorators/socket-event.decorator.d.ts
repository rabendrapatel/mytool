import { ServerRequestUser, HandySocketEventListenerSettings, HandySocket } from "@handy/types";
export declare const OnSocketEvent: (socketEventListener?: Omit<HandySocketEventListenerSettings, 'method'>) => (target: any, methodName: string, descriptor: TypedPropertyDescriptor<(eventData?: any, user?: ServerRequestUser, socket?: HandySocket, rawData?: any) => void>) => void;
