// Globals import
require('./globals/globals');

import 'reflect-metadata';

import { isMaster, fork, Worker, worker } from 'cluster';
import { cpus } from 'os';
import { env } from 'process';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

global.__coresCount = __isDev ? 1 : cpus().length;

function forkNew(master: boolean, globalEvents: Subject<{ eventName: string, data?: any, triggerWorker: number, includeThisCluster: boolean }>, id: number) {
  
  let worker: Worker = master ? fork({ __isClusterMaster: "true", __handyClusterId: id.toString() }) : fork({ __handyClusterId: id.toString() });
  
  worker.on('message', (msg: any) => {

    if (typeof msg === 'object' && isNotEmpty(msg) && isNotEmpty(msg['isHandyGlobalEvent'])) {
      let { name, includeThisCluster, data, triggerWorker } = msg;
      globalEvents.next({ eventName: name, includeThisCluster, data, triggerWorker })
    }

  })

  let workerGlobalSub: Subscription = globalEvents.subscribe(eventData => {

    let { includeThisCluster, triggerWorker, data, eventName } = eventData;

    if (!includeThisCluster && id === triggerWorker) {
      return;
    }

    worker.send({ isHandyEventForWorker: true, eventName, includeThisCluster, data, triggerWorker });

  })

  worker.on('exit', () => {

    workerGlobalSub.unsubscribe();
    forkNew(master, globalEvents, id);

  })

}

if (isMaster) {

  let globalEvents: Subject<{ eventName: string, data?: any, triggerWorker: number, includeThisCluster: boolean }> = new Subject();
  let globalBehaviorals: { [key: string]: BehaviorSubject<any> } = {};

  globalEvents.subscribe(singleGlobalEvent => {

    let { eventName, data, triggerWorker } = singleGlobalEvent;

    if (eventName === 'getGlobalBehavioral') {
      
      let { name, initialVal, triggerWorker } = data;

      if (globalBehaviorals[name] === undefined) {
        globalBehaviorals[name] = new BehaviorSubject(initialVal);
      } 

      let singleGlobalSubjectSub: Subscription = globalBehaviorals[name].subscribe(value => {

        globalEvents.next({
          eventName: 'globalBehavioralSubject',
          triggerWorker: 0,
          includeThisCluster: true,
          data: {
            name,
            triggerWorker,
            value
          }
        })

      })   

      setTimeout(() => {
        singleGlobalSubjectSub.unsubscribe();
      });

    }

    if (eventName.startsWith(__behaviorEventPrefix)) {
      
      let finalEventName: string = eventName.replace(__behaviorEventPrefix, '');

      if (globalBehaviorals[finalEventName] === undefined) {
        globalBehaviorals[finalEventName] = new BehaviorSubject(data);
      } else {
        globalBehaviorals[finalEventName].next(data);
      }

      let singleGlobalSubjectSub: Subscription = globalBehaviorals[finalEventName].subscribe(value => {

        globalEvents.next({
          eventName: finalEventName,
          triggerWorker,
          includeThisCluster: true,
          data: value
        })

      })

      setTimeout(() => {
        singleGlobalSubjectSub.unsubscribe();
      });

    }

  })

  for (let i = 0; i < __coresCount; i++) {

    if (i === 0) {

      forkNew(true, globalEvents, i)
      continue;

    }

    setTimeout(() => {
      forkNew(false, globalEvents, i);
    }, i * 10000);

  }

} else {

  global.__isMasterCluster = env.__isClusterMaster === 'true';

  global.__handyWorkerId = parseInt(env.__handyClusterId);
  global.triggerGlobalServerEvent = (name: string, includeThisCluster: boolean, data?: any): void => {
    worker.send({ isHandyGlobalEvent: true, name, includeThisCluster, data, triggerWorker: __handyWorkerId });
  }

  global.gLobalServerEvent = new Subject();

  worker.on('message', (msg: any) => {

    if (typeof msg === 'object' && isNotEmpty(msg) && isNotEmpty(msg['isHandyEventForWorker'])) {

      let { eventName, data, triggerWorker } = msg;
      // @ts-ignore
      gLobalServerEvent.next({ eventName, data, triggerWorker });

    }

  })

  require('../../paths-aliases');
  require('../../handy.module');

}