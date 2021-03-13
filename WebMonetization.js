// Creator: Néstor Campos (https://github.com/nescampos) and Techgethr (https://github.com/Techgethr)
// Version: 1.0


(function( $ ){

    var total = 0;
    var scale = 0;
    var assetCode = null;
    var classExclusiveContent = null;
    var classHiddenContent = null;
    var pointer = null;

    function isBrowserEnabled()
    {
        if (document.monetization === undefined) {
            return false;
        }
        else {
            return true;
        }
    }

    function isUndefinedState() {
        return document.monetization === undefined;
    }
    

    var methods = {
        isBrowserEnabled: function() {
            return isBrowserEnabled()
        },
        getMonetizationState: function()  {
            if (isBrowserEnabled()) {
                return document.monetization.state;
            }
            else {
                return "Not enabled in this browser";
            }
        },
        registerMonetizedContent: function(classExclusiveContent, classHiddenContent){
            this.classExclusiveContent = classExclusiveContent;
            this.classHiddenContent = classHiddenContent;
        },
        start: function(pointer,callbackFunction) {
            if(pointer === null || pointer === undefined) {
                throw new ReferenceError("pointer is required");
            }
            const monetizationTag = document.querySelector('meta[name="monetization"]');
            if (!monetizationTag) {
                var meta = document.createElement('meta');
                meta.name = "monetization";
                this.pointer = pointer;
                meta.content = pointer;
                document.getElementsByTagName('head')[0].appendChild(meta);
                if(isBrowserEnabled()){
                    if(this.classExclusiveContent){
                        document.monetization.addEventListener('monetizationstart', () => {
                            document.getElementsByClassName(this.classExclusiveContent).classList.remove(this.classHiddenContent)
                          });
                        document.monetization.addEventListener('monetizationstop', () => {
                            document.getElementsByClassName(this.classExclusiveContent).classList.add(this.classHiddenContent)
                          });
                    }
                    
                    document.monetization.addEventListener('monetizationprogress',  ev => {
                        if (this.total === 0) {
                            this.scale = ev.detail.assetScale;
                            this.assetCode = ev.detail.assetCode;
                        }
                        this.total += Number(ev.detail.amount);
                      });
                }
                
            }
            if(callbackFunction){
                callbackFunction();
            }
        },
        init : function(options) {
            
        },
        isPendingState : function() {
            return isBrowserEnabled() && document.monetization.state === 'pending';
        },
        isStartedState : function() {
            return isBrowserEnabled() && document.monetization.state === 'started';
        },
        isStoppedState : function() {
            return isBrowserEnabled() && document.monetization.state === 'stopped';
        },
        isUndefinedState : function() {
            return isUndefinedState();
        },
        changePointer : function(pointer, createIfNotExist = false,callbackFunction) {
            if(pointer === null || pointer === undefined) {
                throw new ReferenceError("pointer is required");
            }
    
            const monetizationTag = document.querySelector('meta[name="monetization"]');
            if (monetizationTag) {
                this.pointer = pointer;
                monetizationTag.content = pointer;
                if(callbackFunction){
                    callbackFunction();
                }
            }
            else {
                if(createIfNotExist) {
                    this.start(pointer,callbackFunction);
                }
            }
        },
        registerStartListener : function(listenerFunction) {
            if (isBrowserEnabled()) {
                document.monetization.addEventListener('monetizationstart', () => {
                    listenerFunction()
                });
            }
        },
        registerProgressListener : function(listenerFunction) {
            if (isBrowserEnabled()) {
                document.monetization.addEventListener('monetizationprogress',  ev => {
                    listenerFunction();
                  });
                  
            }
        },
        getTotalAmountFromCurrentUser : function(){
            return this.total;
        },
        getScaleFromCurrentUser : function(){
            return this.scale;
        },
        getCurrentPointer : function(){
            return this.pointer;
        },
        getAssetCodeFromCurrentUser : function(){
            return this.assetCode;
        },
        registerStopListener : function(listenerFunction) {
            if (isBrowserEnabled()) {
                document.monetization.addEventListener('monetizationstop', () => {
                    listenerFunction()
                });
            }
        },
        registerPendingListener : function(listenerFunction) {
            if (isBrowserEnabled()) {
                document.monetization.addEventListener('monetizationpending', () => {
                    listenerFunction()
                });
            }
        },
        executeOnUndefined : function(callbackFunction) {
            if (this.isUndefinedState()) {
                callbackFunction();
            }
        },
        stop : function(callbackFunction) {
            const monetizationTag = document.querySelector('meta[name="monetization"]')
            if (monetizationTag) {
                monetizationTag.remove();
    
                if(callbackFunction){
                    callbackFunction();
                }
            }
        },
        enableMonetizationOniFrame : function(iframeId){
            var iFrameToEnable = $('#'+iframeId);
            if(iFrameToEnable){
                iFrameToEnable.allow = "monetization";
            }
        },
        disableMonetizationOniFrame : function(iframeId){
            var iFrameToEnable = $('#'+iframeId);
            if(iFrameToEnable){
                iFrameToEnable.removeAttribute("allow");
            }
        }
    };

    $.fn.webmonetization = function(methodOrOptions) {

        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.webmonetization' );
        }    
    };


})( jQuery );