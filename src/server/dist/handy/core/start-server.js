"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Globals import
require('./globals/globals');
require("reflect-metadata");
const cluster_1 = require("cluster");
const os_1 = require("os");
const process_1 = require("process");
const rxjs_1 = require("rxjs");
global.__coresCount = __isDev ? 1 : os_1.cpus().length;
function forkNew(master, globalEvents, id) {
    let worker = master ? cluster_1.fork({ __isClusterMaster: "true", __handyClusterId: id.toString() }) : cluster_1.fork({ __handyClusterId: id.toString() });
    worker.on('message', (msg) => {
        if (typeof msg === 'object' && isNotEmpty(msg) && isNotEmpty(msg['isHandyGlobalEvent'])) {
            let { name, includeThisCluster, data, triggerWorker } = msg;
            globalEvents.next({ eventName: name, includeThisCluster, data, triggerWorker });
        }
    });
    let workerGlobalSub = globalEvents.subscribe(eventData => {
        let { includeThisCluster, triggerWorker, data, eventName } = eventData;
        if (!includeThisCluster && id === triggerWorker) {
            return;
        }
        worker.send({ isHandyEventForWorker: true, eventName, includeThisCluster, data, triggerWorker });
    });
    worker.on('exit', () => {
        workerGlobalSub.unsubscribe();
        forkNew(master, globalEvents, id);
    });
}
if (cluster_1.isMaster) {
    let globalEvents = new rxjs_1.Subject();
    let globalBehaviorals = {};
    globalEvents.subscribe(singleGlobalEvent => {
        let { eventName, data, triggerWorker } = singleGlobalEvent;
        if (eventName === 'getGlobalBehavioral') {
            let { name, initialVal, triggerWorker } = data;
            if (globalBehaviorals[name] === undefined) {
                globalBehaviorals[name] = new rxjs_1.BehaviorSubject(initialVal);
            }
            let singleGlobalSubjectSub = globalBehaviorals[name].subscribe(value => {
                globalEvents.next({
                    eventName: 'globalBehavioralSubject',
                    triggerWorker: 0,
                    includeThisCluster: true,
                    data: {
                        name,
                        triggerWorker,
                        value
                    }
                });
            });
            setTimeout(() => {
                singleGlobalSubjectSub.unsubscribe();
            });
        }
        if (eventName.startsWith(__behaviorEventPrefix)) {
            let finalEventName = eventName.replace(__behaviorEventPrefix, '');
            if (globalBehaviorals[finalEventName] === undefined) {
                globalBehaviorals[finalEventName] = new rxjs_1.BehaviorSubject(data);
            }
            else {
                globalBehaviorals[finalEventName].next(data);
            }
            let singleGlobalSubjectSub = globalBehaviorals[finalEventName].subscribe(value => {
                globalEvents.next({
                    eventName: finalEventName,
                    triggerWorker,
                    includeThisCluster: true,
                    data: value
                });
            });
            setTimeout(() => {
                singleGlobalSubjectSub.unsubscribe();
            });
        }
    });
    for (let i = 0; i < __coresCount; i++) {
        if (i === 0) {
            forkNew(true, globalEvents, i);
            continue;
        }
        setTimeout(() => {
            forkNew(false, globalEvents, i);
        }, i * 10000);
    }
}
else {
    global.__isMasterCluster = process_1.env.__isClusterMaster === 'true';
    global.__handyWorkerId = parseInt(process_1.env.__handyClusterId);
    global.triggerGlobalServerEvent = (name, includeThisCluster, data) => {
        cluster_1.worker.send({ isHandyGlobalEvent: true, name, includeThisCluster, data, triggerWorker: __handyWorkerId });
    };
    global.gLobalServerEvent = new rxjs_1.Subject();
    cluster_1.worker.on('message', (msg) => {
        if (typeof msg === 'object' && isNotEmpty(msg) && isNotEmpty(msg['isHandyEventForWorker'])) {
            let { eventName, data, triggerWorker } = msg;
            // @ts-ignore
            gLobalServerEvent.next({ eventName, data, triggerWorker });
        }
    });
    require('../../paths-aliases');
    require('../../handy.module');
}
//# sourceMappingURL=start-server.js.map