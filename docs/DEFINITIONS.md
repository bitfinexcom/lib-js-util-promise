## Functions

<dl>
<dt><a href="#promiseFlat">promiseFlat()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns promise and separated resolve, reject methods</p>
</dd>
<dt><a href="#promiseMap">promiseMap(elements, fn, concurrency)</a> ⇒ <code>Array.&lt;Promise&gt;</code></dt>
<dd><p>Apply function to iterable and execute returned promises concurrently with optional limit.
Interrupts execution if any of promises rejected similar to Promise.all</p>
</dd>
<dt><a href="#promiseSleep">promiseSleep(ms, [retVal])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Wait until specific time before resolving the promise</p>
</dd>
<dt><a href="#promiseTimeout">promiseTimeout(promise, ms, [errMsg])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Run a promise with an execution timeout</p>
</dd>
<dt><a href="#resolvePromiseCb">resolvePromiseCb(err, res, cb)</a> ⇒ <code>void</code> | <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Calls the callback or resolves the Promise if no cb</p>
</dd>
<dt><a href="#waitForCondition">waitForCondition(action, [opts])</a> ⇒</dt>
<dd><p>Wait for sometime until an action resolves to a truthy result</p>
</dd>
</dl>

<a name="promiseFlat"></a>

## promiseFlat() ⇒ <code>Object</code>
Returns promise and separated resolve, reject methods

**Kind**: global function  
<a name="promiseMap"></a>

## promiseMap(elements, fn, concurrency) ⇒ <code>Array.&lt;Promise&gt;</code>
Apply function to iterable and execute returned promises concurrently with optional limit.
Interrupts execution if any of promises rejected similar to Promise.all

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Array.&lt;any&gt;</code> | array of elements. Each element will be passed as an argument to the function |
| fn | <code>function</code> | a function to apply to each element |
| concurrency | <code>number</code> | limit of promises to be executed in parallel. Default is 0 - no limit |

<a name="promiseSleep"></a>

## promiseSleep(ms, [retVal]) ⇒ <code>Promise.&lt;any&gt;</code>
Wait until specific time before resolving the promise

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ms | <code>number</code> |  | Time in milliseconds until promise is resolved |
| [retVal] | <code>any</code> | <code></code> | Optional return value that is resolved |

<a name="promiseTimeout"></a>

## promiseTimeout(promise, ms, [errMsg]) ⇒ <code>Promise.&lt;any&gt;</code>
Run a promise with an execution timeout

**Kind**: global function  
**Throws**:

- <code>PromiseTimeoutError</code> 


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| promise | <code>Promise.&lt;any&gt;</code> \| <code>function</code> |  | Promise that timeout will be checked against |
| ms | <code>number</code> |  | Time in milliseconds until promise is timed out |
| [errMsg] | <code>string</code> | <code>null</code> | Custom error message for PromiseTimeoutError |

<a name="resolvePromiseCb"></a>

## resolvePromiseCb(err, res, cb) ⇒ <code>void</code> \| <code>Promise.&lt;any&gt;</code>
Calls the callback or resolves the Promise if no cb

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The error, if any |
| res | <code>any</code> | The resolved value, if any |
| cb | <code>function</code> | The callback function, if not a promise |

<a name="waitForCondition"></a>

## waitForCondition(action, [opts]) ⇒
Wait for sometime until an action resolves to a truthy result

**Kind**: global function  
**Returns**: Promise<any> - action result  
**Throws**:

- <code>PromiseTimeoutError</code> 


| Param | Type | Description |
| --- | --- | --- |
| action | <code>function</code> |  |
| [opts] | <code>object</code> |  |
| [opts.timeoutMs] | <code>number</code> | max time to wait condition to happen |
| [opts.intervalMs] | <code>number</code> | time between checks |

