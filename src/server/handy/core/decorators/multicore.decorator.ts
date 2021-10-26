export const MultiCore = (settings: { internalPropName?: string, globalChangeEventName?: string, consoleSettings?: boolean } = {}) => {

  if (isEmpty(settings)) {
    settings = {};
  }

  function emitGlobal(target: any, globalChangeEventName: string, internalPropName: string): void {
    triggerGlobalServerEvent(__behaviorEventPrefix + globalChangeEventName, false, target[internalPropName]);
  }

  return (target: any, name: any, descriptor?: PropertyDescriptor): any => {

    let className: string = target.constructor.name;

    let initialSet: boolean = __isMasterCluster;

    let { internalPropName = `hmcp_${className}_${name}`, globalChangeEventName = `hmcpsn_${className}_${name}`, consoleSettings = false } = settings;

    gLobalServerEvent.subscribe(globalEvent => {

      let { eventName, triggerWorker, data } = globalEvent;
      if (eventName === globalChangeEventName && triggerWorker !== __handyWorkerId) {
        target[internalPropName] = data;
      }

    })

    if (__isMasterCluster && consoleSettings) {

      console.log({
        multiCorePropName: name,
        internalPropName,
        globalChangeEventName
      })

    }

    let globalBehaviorSubjectListener = gLobalServerEvent.subscribe(globalEvent => {

      let { eventName, data } = globalEvent;

      if (eventName === 'globalBehavioralSubject') {

        if (data.name === globalChangeEventName && data.triggerWorker === __handyWorkerId) {

          initialSet = true;

          if (data.triggerWorker !== 0) {
            target[internalPropName] = data.value;
          }

          setTimeout(() => {
            globalBehaviorSubjectListener.unsubscribe();
          });

        }

      }

    })

    triggerGlobalServerEvent('getGlobalBehavioral', true, {
      name: globalChangeEventName,
      triggerWorker: __handyWorkerId
    })

    let finalDesriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      set(value) {

        target[internalPropName] = value;
        emitGlobal(target, globalChangeEventName, internalPropName);

      },
      get() {

        if (!initialSet) {

          handyErrLog('Accessing unitialized @MultiCore variable "' + name + '". Postpone this variable usage to OnInit or later...');

          setTimeout(() => {

            throw new Error('Accessing unitialized @MultiCore variable "' + name + '". Postpone this variable usage to OnInit or later...');

          }, 5000);

        }

        return target[internalPropName];

      }

    }

    if (descriptor) {

      const originalDesc = descriptor;

      if (originalDesc.set) {

        function set(value: any) {

          target[internalPropName] = value;
          emitGlobal(target, globalChangeEventName, internalPropName);

          // @ts-ignore
          const finalSet = originalDesc.set.bind(this);
          return finalSet(value);

        }

        finalDesriptor.set = set;

      }

      if (originalDesc.get) {

        function overwrittenGetter(): any {

          if (!initialSet) {

            handyErrLog('Accessing unitialized @MultiCore variable "' + name + '". Postpone this variable usage to OnInit or later...');

            setTimeout(() => {

              throw new Error('Accessing unitialized @MultiCore variable "' + name + '". Postpone this variable usage to OnInit or later...');

            }, 5000);

          }

          // @ts-ignore
          const finalGet = originalDesc.get.bind(this);
          return finalGet();

        }

        finalDesriptor.get = overwrittenGetter;

      }

    }

    return finalDesriptor;

  }

}