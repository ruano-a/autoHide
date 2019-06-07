# autoHide
A plugin to automatically hide an element, typically a menu, and show it back when moving the cursor.

# Basic usage
~~~~
$('#selector').autoHide();
~~~~

# The options

~~~~
var defaults =  {
        elem_move_duration:       300,
        delay_before_hide_elem:   1000,
        direction:                'bottom',
        before_hide:              function() {return true;},
        after_hide:               function() {return true;},
        before_show:              function() {return true;},
        after_show:               function() {return true;}
    };
~~~~

Example : 
~~~~
$('#selector').autoHide({delay_before_hide_elem: 1500});
~~~~

# Requirements
Jquery (tested with the 1.12.4 version minimum)
This plugin assumes that the element to hide has a fixed position. See the example for more details.

This plugin had been conceived for a private use at first, I made it public since it can be useful.
