# ilw-input

Links: **[ilw-input in Builder](https://builder3.toolkit.illinois.edu/component/ilw-input/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

This provides classes to style form elements. All form elements should be inside an `<ilw-content>` tag and a `<form>` tag.

## Code Examples

```html
<ilw-content>
    <form>
        <div class="ilw-input-entry">
            <label for="textbox">Text Box</label>
            <input id="textbox" type="text">
        </div>
        <div class="ilw-input-entry">
            <label for="textbox-required" class="ilw-label-required">Required Text Box </label>
            <input id="textbox-required" type="text" required="">
        </div>
        
    </form>
</ilw-content>
```

## Accessibility Notes and Use


## External References

[Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
