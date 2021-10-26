addEventListener('message', function (event) {

  try {

    if (!event.data.fn.startsWith('(')) {
      event.data.fn = event.data.fn.substring(event.data.fn.indexOf('('));
    }
    
    let firstLine = event.data.fn.split(/\r?\n/)[0];

    if (!firstLine.includes('=>')) {
      event.data.fn = event.data.fn.replace(')', ') => ');
    }
    
    event[event.data.fnEventName] = eval(event.data.fn);
    result = event[event.data.fnEventName](event.data.param);

    if (typeof result === 'object' && typeof result.then === 'function') {

      result.then(promiseResult => {

        postMessage({
          result: promiseResult,
          fnEventName: event.data.fnEventName
        });

      })
        .catch(error => {

          postMessage({
            error,
            fnEventName: event.data.fnEventName
          });

        })

    } else {

      postMessage({
        result,
        fnEventName: event.data.fnEventName
      });

    }


  } catch (error) {

    postMessage({
      error,
      fnEventName: event.data.fnEventName
    });

  }

  // SUYNC Function done
  // try {

  //   event[event.data.fnEventName] = eval(event.data.fn);
  //   result = event[event.data.fnEventName](event.data.param);

  //   postMessage({
  //     result, 
  //     fnEventName: event.data.fnEventName
  //   });

  // } catch (error) {

  //   postMessage({
  //     error,
  //     fnEventName: event.data.fnEventName
  //   });

  // }

}, false);
