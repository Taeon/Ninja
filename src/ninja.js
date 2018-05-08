if( typeof $ == 'undefined' ){
    var $ = function( selector ){

        /**
         * append
         */
        var A = function( selector ){
            var nodelist = F( selector );
            for( var i = 0; i < nodelist.length; i++ ) {
                this[0].appendChild( nodelist[ i ] );
            }
            return this;
        };
		/**
        * prepend
        */
        var P = function( selector ){
            var nodelist = F( selector );
            for( var i = nodelist.length - 1; i >= 0 ; i-- ) {
                this[ 0 ].insertBefore( nodelist[ i ], this[ 0 ].firstChild);
            }
            return this;
        };
		/**
        * remove
        */
        var R = function( selector ) {
            this.each( function(){this.parentNode.removeChild(this);} );
        }

    	// each
        var E = function( fn ) {
            for (var i = 0; i < this.length; i++){
                fn.apply(this[i]);
            }
        }


        /**
        * closest
        */
        var FC = function( selector ){
            var elements = [];
            for( var i = 0; i < this.length; i++ ){
                var element = this[ i ];
                while( element ){
                    if ( IS( element, selector ) ) {
                        elements.push( element );
                        element = false;
                    }
                    element = element.parentNode;
                }
            }
            return $( elements );
        };

        /**
        * on
        */
        var _O = function( target, event, func ){
           for( var i = 0; i < target.length; i++ ){
               target[ i ].addEventListener( event, func );
           }
        };
        var O = function( event, func ){
            var events = event.split( ' ' );
            for( var i = 0; i < events.length; i++ ){
                if( events[ i ].length > 0 ){
                    _O( this, events[ i ], func );
                }
            }
           return this;
        };
        /**
        * off
        */
        var OF = function( event, func ){
           for( var i = 0; i < this.length; i++ ){
               this[ i ].removeEventListener( event, func );
           }
           return this;
        };

        /**
        * addClass
        */
        var AC = function( className ){
            for( var i = 0; i < this.length; i++ ){
                if (this[ i ].classList){
                    // Because Webkit browsers don't support adding multiple classes with spaces
                    DOMTokenList.prototype.add.apply(this[ i ].classList, className.split( ' ' ));
                } else {
                    this[ i ].className += ' ' + className;
                }
            }
            return this;
        };
        /**
        * removeClass
        */
        var RC = function( classes ){

            if (this.classList){
                for( var i = 0; i < this.length; i++ ){
                    // Because Webkit browsers don't support removing multiple classes with spaces
                    DOMTokenList.prototype.remove.apply(this[ i ].classList, classes.split( ' ' ));
                }
            } else {
                if ( classes.indexOf( ' ' ) != -1 ) {
                    classes = classes.split(' ');
                } else {
                    classes = [classes];
                }
                for ( var i = 0; i < classes.length; i++ ) {
                    var className = classes[i];
                    this.each(
                        function(){
                            this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                        }
                    );
                }
            }

            return this;
        };

        /**
        * hasClass
        */
        var HC = function( className ){
            var o = false;
            for( var i = 0; i < this.length; i++ ){
                if (this[ i ].classList){
                    if( this[ i ].classList.contains(className) ){
                        return true
                    };
                } else {
                    if( new RegExp('(^| )' + className + '( |$)', 'gi').test( this[ i ].className ) ){
                        return true
                    };
                }
            }
            return false;
        }

        /**
         * insertBefore
         */
        var IB = function( selector ){
            var nodelist = $( selector );
            for( var i = 0; i < nodelist.length; i++ ){
                var element = nodelist[ i ];
                $( this ).each(
                    function() {
                        element.parentNode.insertBefore(this,element);
                    }
                );
            }
            return this;
        }
        /**
         * insertAfter
         */
        var IA = function( selector ){

            var nodelist = $( selector );
            for( var i = 0; i < nodelist.length; i++ ){
                var element = nodelist[ i ];
                $( this ).each(
                    function() {
                        element.parentNode.insertBefore(this, element.nextSibling);
                    }
                );
            }
            return this;
        }

        /**
        * is
        */
        var IS = function(el, selector) {
            if ( $.isArray( el ) ) {
                for( var i = 0; i < el.length; i++ ){
                    return IS( el[ i ], selector );
                }
            }
            if ( selector instanceof HTMLElement ) {
                return el === selector;
            } else {
                if ( $.isArray( selector ) ) {
                    for( var i = 0; i < selector.length; i++ ){
                        if ( IS( el, selector ) ) {
                            return true;
                        }
                    }
                } else {
                    var matches = (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector);
                    if( typeof matches != 'undefined' ){
                        return matches.call(el, selector);
                    }
                }
            }
            return false;
        }

        /**
         * trigger
         */
         var T = function( event_name ){
            if ("createEvent" in document) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent( event_name, false, true);
                for( var i = 0; i < this.length; i++ ){
                    this[i].dispatchEvent(evt);
                }
            } else {
                for( var i = 0; i < this.length; i++ ){
                    this[ i ].fireEvent(event_name);
                }
            }
        }

        /**
         * offset (position relative to document)
         */
        var OS = function(){
            // Returns the first element
            if( this.length == 0 ){
                return undefined;
            }
            var elem = this[0];
            var box = elem.getBoundingClientRect();

            var body = document.body;
            var docEl = document.documentElement;

            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;

            var top  = box.top +  scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            return { top: top, left: left };
        }

        /**
         * Data
         */
             if( typeof value !== 'undefined' ){
                 for( var i = 0; i < this.length; i++ ){
                     if( typeof value == 'object' ){
                         this[ i ][ '__object_data-' + name ] = value;
                         value = '__object_data-' + name;
                     }
                     this[ i ].setAttribute( 'data-' + name, value );
                 }
                 var value = this[ 0 ].getAttribute( 'data-' + name );
                 if( value !== null ){
                     if( value.indexOf( '__object_data-' ) === 0 ){
                         return this[ 0 ][ value ];
                     }
                     return value;
                 }
                 return undefined;
             } else {
                 for( var i = 0; i < this[ 0 ].attributes.length; i++ ){
                     if( this[ 0 ].attributes[ i ].name.substr( 0, 5 ) == 'data-' ){
                         var name = this[ 0 ].attributes[ i ].name.substr( 5 );
                         var value = this[ 0 ].attributes[ i ].value;
                         data[ name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }) ] = value; // For jQuery 3 compatiblity (DataSet API https://api.jquery.com/data/)
                     }
                 }
                 return data;
             }
             return undefined;
         }

         /**
          * Index
         var I = function(){
             var i = 1;
             var current = this[0];
             while( (current = current.previousSibling) != null ) i++;
             return i - 1;
         }

        /**
         * find
         */
        var F = function( element, parent_element ){
            var e;
            if( element instanceof HTMLElement || element instanceof Window || element instanceof DocumentFragment ){
                e = [element];
            } else {
                switch ( Object.prototype.toString.call(element).match( /\[object (.*)\]/ )[1] ) {
                    case 'String':{
                        if ( element.charAt( 0 ) == '<' ) {
                            var dummy = document.createElement( 'DIV' );
                            dummy.innerHTML = element;
                            elements = dummy.childNodes;
                        } else {
                            var children_only = false;
                            if ( element.charAt( 0 ) == '>' ) {
                                children_only = true;
                                element = element.substring( 1 );
                            }
                            if ( parent_element ) {
                                if ( $.isArray( parent_element ) ) {
                                    var elements = [];
                                    for ( var i = 0; i < parent_element.length; i++ ) {
                                        var found_elements = parent_element[ i ].querySelectorAll(element);
                                        for ( var f = 0; f < found_elements.length; f++ ) {
                                            if(elements.indexOf(found_elements[f]) == -1 ){
                                                elements.push.apply( elements, parent_element[ i ].querySelectorAll(element) );
                                            }
                                        }
                                    }
                                }
                            } else {
                                elements = document.querySelectorAll(element);
                            }
                            if ( children_only ) {
                                var new_elements = [];
                                parent_element = (parent_element)?parent_element:document;
                                for( var i = 0; i < elements.length; i++ ){
                                    if ( IS( parent_element, elements[i].parentNode ) ) {
                                        new_elements.push(elements[i]);
                                    }
                                }
                                elements = new_elements;
                            }
                        }

                        break;
                    }
                    case 'Object':
                    {
                        // jQuery list of elements?
                        if ( typeof jQuery != 'undefined' && element instanceof jQuery ) {
                            elements = element.toArray();
                        }
                        break;
                    }
                    case 'Array':
                    case 'NodeList':{
                        elements = element;
                        break;
                    }
                    case 'Function':{
                        // Call when page loads
                        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
                            element();
                        } else {
                            document.addEventListener('DOMContentLoaded', element);
                        }
                        return;
                    }
                    case 'Undefined':{
                        elements = [];
                        break;
                    }
                    default:{
                        console.log(element);
                        console.log(Object.prototype.toString.call(element).match( /\[object (.*)\]/ )[1]);
                    }
                }
                // Convert elements into array
                var e = [];
                for ( var i = 0; i < elements.length; i++ ) {
                    e.push( elements[ i ] );
                }
            }

            // Add methods
            var f = {append:A,prepend:P,insertAfter:IA,insertBefore:IB,on:O,off:OF,addClass:AC,hasClass:HC,removeClass:RC,each:E,closest:FC,remove:R,trigger:T,offset:OS,data:D,index:I};
            for ( var fi in f ) {
                e[fi] = function( e, f ){
                   return function(){return f.apply( e, arguments )};
                }.apply( e, [e, f[fi]] )
            }
            e.find = function(selector){return F.apply(e,[selector,e])};

            return e;
        };

        var e = F( selector );

        return e;
    }
    $.proxy = function( func, context ){
        return function(){func.apply( context, arguments )};
    }
    $.isArray = function( arr ){
        return Object.prototype.toString.call( arr ).match( /\[object (.*)\]/ )[1] == 'Array';
    }
    $.ajax = function( url, opt ){
        var o = {
            method: 'get',
            data: null,
            success:function(){},
            error:function(){}
        };
        for( var index in opt ){
            o[ index ] = opt[ index ];
        }

        var request = new XMLHttpRequest();
        request.open( o.method, url, true );
        request.setRequestHeader('Accept', 'application/json');

        var data = null;
        if( o.data !== null && o.method.toLowerCase() == 'post' ){
            var data = new FormData();

            for ( var key in o.data ) {
                data.append(key, o.data[key]);
            }
        }
        if( o.data !== null && o.method.toLowerCase() == 'delete' ){
            var str = [];
             for (var p in o.data)
               if (o.data.hasOwnProperty(p)) {
                 str.push(encodeURIComponent(p) + "=" + encodeURIComponent(o.data[p]));
               }
             var data = str.join("&");
        }

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            o.success(
                JSON.parse( request.response ),
                request.statusText,
                request
            );
          } else {
            o.error(
                JSON.parse( request.response ),
                'error',
                request.statusText
            );
          }
        };

        request.onerror = function(){
            o.error(
                JSON.parse( request.response ),
                'error',
                request.statusText
            );
        };

        request.send(data);
    };
}
