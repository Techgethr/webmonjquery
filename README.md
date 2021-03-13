# WebMonetization Jquery JS Helper
Jquery Javascript Helper for implementing WebMonetization Specification (https://webmonetization.org/)

## License
----
MIT

## Contributors
----

- [Néstor Nicolás Campos Rojas](https://www.linkedin.com/in/nescampos/)
- [Techgethr SpA](https://techgethr.com/)
- [Coil](https://coil.com/)
- [WebMonetization](https://webmonetization.org/)

## Use the library

To consume this library, just add in the web header this library, its full version (after Jquery)

**Full version**

```html
    <script src="WebMonetization.js" type="text/javascript"></script>
```

## Checking availability

### Checking if WebMonetization is enabled in web browser and its status

For checking if enabled, *isBrowserEnabled()* function returns a boolean value (true if enabled, false if not):

```js
    var enabled = $(document).webmonetization('isBrowserEnabled')
```

For checking status, *getMonetizationState()* function returns a string value with status. It returns **"Not enabled in this browser"** if browser is not enabled:

```js
    var statusText = $(document).webmonetization('getMonetizationState');
```

## Starting

For starting WebMonetization Jquery Helper, you can register HTML classes for your exclusive content for WebMonetization users.
For example, here is a HTML content:

```html
    <div class="exclusive hidden"> Here is an exclusive text WebMonetization users. Hidden for other users.</div>
```

### Register exclusive content (this step is optional)

For registering, you must use the *registerMonetizedContent()* method. This function accepts 2 parameters, "classContent" is the class name for exclusive and "classHidden" is the class name for hidden content when you start and stop WebMonetization. 

```js
    var classContent = "exclusive";
    var classHidden = "hidden";
    $(document).webmonetization('registerMonetizedContent',classContent, classHidden)
```

### Start

For starting, you must use the *start()* method. This method creates the meta tag for monetization with the wallet's payment pointer specified as parameter. Also, you can specify a callback method after starting is done.

```js
    function printConsole() {
        console.log("WebMonetization is started");
    }

    var pointer = "$wallet.example.com/alice";
    $(document).webmonetization('start',pointer,printConsole);
```

**You are ready, your website is already monetizing the content.**

## Checking states

When you need to check states, in addition to the *getMonetizationState()* function, you can use the following available functions:

- *isPendingState()*: For checking if WebMonetization is in pending state. Returns a boolean value.
- *isStartedState()*: For checking if WebMonetization is in started state. Returns a boolean value.
- *isStoppedState()*: For checking if WebMonetization is in stopped state. Returns a boolean value.
- *isUndefinedState()*: For checking if WebMonetization is in undefined state (when WebMonetization is not enabled in the web browser). Returns a boolean value.


For example:

```js
    var isStopped = $(document).webmonetization('isStoppedState');
    if(isStopped) {
        console.log("WebMonetization is stopped and can not be used.");
    }
```

## Register new values

### Change pointer 

Sometimes you will need to change the pointer (wallet's payment pointer for content). To do this, you can use the *changePointer* method.
This method receive 1 required and 2 optional parameters.
- pointer: This required parameter specifies the new pointer address for monetization.
- createIfNotExist: This optional parameter (false by default) specifies if meta tag for monetization must be created if not exists (call to *start()* method).
- callbackFunction: This optional parameter, you can use for calling another function after change the pointer.

```js
    var newpointer = "$wallet.example.com/nestor";
    $(document).webmonetization('changePointer',newpointer,false)
```

### Listeners

Sometimes you need to register functions to listen for certain events when using WebMonetization. To do this, you can use:

- *registerStartListener(listenerFunction)*: It executes when WebMonetization is in started state.
- *registerProgressListener(listenerFunction)*: It executes when WebMonetization is in progress state.
- *registerStopListener(listenerFunction)*: It executes when WebMonetization is in stopped state.
- *registerPendingListener(listenerFunction)*: It executes when WebMonetization is in pending state.
- *executeOnUndefined(listenerFunction)*: It executes when WebMonetization is undefined in the web browser.

**listenerFunction**: It is the function for executing.

For example:
```js
    function printPendingState() {
        console.log("WebMonetization is in pending state.");
    }
    $(document).webmonetization('registerPendingListener',printPendingState)
```

### iFrames

If you have iFrames in your page, and you need to enable and disable WebMonetization for those contents, you can use these methods:

- *enableMonetizationOniFrame(iframeId)*: With this method, you can enable WebMonetization for an iFrame with the specified Id as parameter.

```js
    var iFrameId = "myfirstIFrame";
    $(document).webmonetization('enableMonetizationOniFrame',iFrameId)
```

- *disableMonetizationOniFrame(iframeId)*: With this method, you can disable WebMonetization for an iFrame with the specified Id as parameter.

```js
    var iFrameId = "myfirstIFrame";
    $(document).webmonetization('disableMonetizationOniFrame',iFrameId)
```

**Pages inside the iFrames must have "monetization" meta tag for using WebMonetization**


## Get values

If you need to get some values, you can use the next methods:

- *getTotalAmountFromCurrentUser()*: Obtains the amount obtained so far by the user who consumes the monetized content.
- *getScaleFromCurrentUser()*: Obtains the scale for the amount value (this value, multiplied for the amount, you get the real amount received). For Example: 0.01
- *getAssetCodeFromCurrentUser()*: Obtains the asset code for user's payments. For example, USD.
- *getCurrentPointer()*: Obtains the current wallet pointer for payments.

For example:

```js
    var totalAmount = $(document).webmonetization('getTotalAmountFromCurrentUser');
    console.log("The total amount is "+totalAmount);
```


## Stopping

For stopping WebMonetization in your page and payments from your users, you must use the *stop()* method. This method has an optional parameters, "callbackFunction" with a function for executing when the process is stopped.

```js
    $(document).webmonetization('stop');
```