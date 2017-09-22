# Ninja

**N**INJA **I**s **N**ot a **J**query **A**lternative. Geddit? Except it is. Sort of.

## What NINJA is

Ninja is intended to be a very small (as in, small file size) stand-in for jQuery, when all you need is some of what it can do -- like DOM manipulation or event handling.

I created it because I wanted to create JavScript libraries that didn't require jQuery, but I often found myself frustrated at having to use JavaScript's verbose syntax. So I wanted to write

$( '.button' ).on( 'click', function(){...} );

...but instead I had to write

document.querySelector( '.button' ).addEventListener( 'click', function(){...} );

Not only is that very laborious, it's also very inefficient if you're doing it a lot. So I found myself creating a bunch of helper functions to save time...and then just thought "why not collect them together in one place and make them work like jQuery?".

## What NINJA is **not**

So NINJA uses jQuery's syntax, but it provides only a very small subset of jQuery's functionality. It is not intended as a like-for-like replacement for jQuery (if that's what you're looking for, try [Zepto](https://github.com/madrobby/zepto)) and it will never become that. 
