import { DefaulthandySocketEmitterService } from "@handy/core/defaults/services/handy-socket-emitter/default-handy-socket-emitter.service";
import { Service } from "@handy/core";

@Service({
  singleton: true,
  routable: false
})
export class HandySocketEmitter extends DefaulthandySocketEmitterService {

  constructor() {
    super();
  }

}