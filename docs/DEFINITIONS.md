## Functions

<dl>
<dt><a href="#promiseSleep">promiseSleep(ms, [retVal])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Wait until specific time before resolving the promise</p>
</dd>
<dt><a href="#promiseTimeout">promiseTimeout(promise, ms, [errMsg])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Run a promise with an execution timeout</p>
</dd>
</dl>

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

