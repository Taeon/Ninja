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
        var O = function( event, func ){
           for( var i = 0; i < this.length; i++ ){
               this[ i ].addEventListener( event, func );
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
                    this[ i ].classList.add(className);
                } else {
                    this[ i ].className += ' ' + className;
                }
            }
        };
        /**
        * removeClass
        */
        var RC = function( classes ){
            if ( classes.indexOf( ' ' ) != -1 ) {
                classes = classes.split(' ');
            } else {
                classes = [classes];
            }
            for ( var i = 0; i < classes.length; i++ ) {
                var className = classes[i];
                this.each(function(){
                    if (this.classList)
                        this.classList.remove(className);
                    else
                        this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                );
            }
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
                    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
                }
            }
            return this;
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
        OS = function(){
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

            return { top: Math.round(top), left: Math.round(left) };
        }

        /**
         * find
         */
        var F = function( element, parent_element ){
            var e;
            if( element instanceof HTMLElement || element instanceof Window ){
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
                        if (document.readyState != 'loading' && document.readyState != 'interactive'){
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
            var f = {append:A,prepend:P,insertAfter:IA,insertBefore:IB,on:O,off:OF,addClass:AC,hasClass:HC,removeClass:RC,each:E,closest:FC,remove:R,trigger:T,offset:OS};
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
}
