# Ninja

**N**INJA **I**s **N**ot a **J**query **A**lternative. Geddit? Except it is. Sort of.

## What NINJA is

Ninja is intended to be a very small stand-in for jQuery, when all you need is some of what it can do -- like DOM manipulation or event handling. It's <5.1KB minified, <2.2KB GZipped (you do GZIP your pages, right?) -- small enough that you could embed it directly into the ```<HEAD>``` of your HTML without worrying about page bloat.

I created it because I wanted to build JavaScript libraries that didn't require jQuery, but I often found myself frustrated at having to use JavaScript's verbose syntax. So I wanted to write

```javascript
$( '.button' ).on( 'click', function(){...} );
```

...but instead I had to write

```javascript
document.querySelector( '.button' ).addEventListener( 'click', function(){...} );
```

Not only is that very laborious, it's also very inefficient if you're doing it a lot. So I found myself creating a bunch of helper functions to save time...and then just thought "why not collect them together in one place and make them work like jQuery?".

## What NINJA is **not**

So NINJA uses jQuery's syntax, but it provides only a very small subset of jQuery's functionality. It is not intended as a like-for-like replacement for jQuery, and it will never become that. If you're looking 'jQuery-but-smaller', try [Zepto](https://github.com/madrobby/zepto).

## Making it even smaller

To further save bandwidth, you can just delete any methods you're not using. Watch our for dependencies though (e.g F() is used by a whole bunch of other methods). Obviously you'll need to minify the custom version of the code yourself.

## When NINJA isn't enough...

If you start using NINJA and then later discover that for some reason you need some function from jQuery that NINJA doesn't provide, that's not a problem. Because the syntax is the same, you can just swap out NINJA, add jQuery and off you go -- no code changes required.

## Supported syntax and methods

### Selectors

NINJA uses (more or less) the same selector syntax as jQuery, so pretty much anything you can do with a jQuery selector, you can do with NINJA. More specifically, it's relies on Javascript's native ```querySelectorAll()``` function -- note that  there are reportedly some inconsistencies between the two ([for example...](https://developer.rackspace.com/blog/using-querySelector-on-elements/)).

I've also heard it said that there are differences between browser implementations (which jQuery fixes). I haven't yet come across any, however.

### Functions

At the moment, NINJA supports the following functions:

- Call a function on document ready

```javascript
$( function(){ alert( 'Hello world!' ); } );
```

- Create a DOM element:

```javascript
var element = $( '<div>Hello World!</div>' );
```

- Append

```javascript
$( '#some-element' ).append( '#another-element' );
```
- Prepend

```javascript
$( '#some-element' ).prepend( '#another-element' );
```
- Insert before

```javascript
$( '#some-element' ).insertBefore( '#another-element' );
```
- Insert after

```javascript
$( '#some-element' ).insertAfter( '#another-element' );
```

- Find position in window (top, left)

```javascript
var pos = $( '#some-element' ).offset();
```

- Remove

```javascript
$( '#some-element' ).remove();
```

- Find closest ancestor

```javascript
var element = $( '#some-element' ).closest( '.another-class' );
```

- Add a class

```javascript
$( '.some-class' ).addClass( 'another-class' );
```

- Remove a class

```javascript
$( '.some-class' ).removeClass( 'another-class' );
```

- Has a class?

```javascript
if( $( '.some-class' ).hasClass( 'another-class' ) ){...}
```

- Each

```javascript
$( '#some-element' ).each( function(){...} );
```

- Add event listener

```javascript
$( '#some-element' ).on( 'click', function(){...} );
```

- Remove event listener

```javascript
$( '#some-element' ).off( 'click', function(){...} );
```

- Trigger event

```javascript
$( '#some-element' ).trigger( 'click' );
```

- Proxy

```javascript
var func = $.proxy( function(){...}, this );
```

- Is array?

```javascript
if( $.isArray( myArray ) ){...}
```

- AJAX

Send an AJAX request. This is a HIGHLY simplified version of the equivalent jQuery function.

```javascript
var func = $.ajax( url, options );
```

Currently the options (and their defaults) are as follows:

```javascript
{
  method: 'get', // Request method e.g. get, post etc
  data: null, // Any data to send with the (POST) request
  success: function(){} // Callback on success. Arguments are JSON-decoded response text, status text, request object
  error: function(){{ // Callback on failure. Arguments are request object, 'error', status text
}
```

## Compatibility

Known to work with pretty much any recent browser (Chrome, Firefox, Safari, IE, Opera). Even IE9!

## Acknowledgements

This library owes a massive debt to [You Might Not Need jQuery](http://youmightnotneedjquery.com/), so hats off to them. Also, inevitably, to an uncountable number of contributors to various threads on [StackOverflow](https://stackoverflow.com). You're all amazing.
