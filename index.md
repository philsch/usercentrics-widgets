## Usercentrics Widgets

Lighweight and customizable placeholders for your third party content (like Youtube Videos, Google Maps etc.) compatible with the [Usercentrics CMP](https://usercentrics.com) (subscription required).

### 📦 Small footprint

The additional JavaScript library adds less than 5kb (< 2.5kb compressed) to your existing website.

### 💡 Easy to use

Just some easy steps to make your **iframe** GDPR compliant:

* change the `src` attribute to `data-src`
* add the `uc-widget` class
* add the `data-uc-id` attribute (the Usercentrics Service ID you want to linke the iframe to)
* finally make sure this script is added at the end of your HTML `body`

A complete example looks like:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Youtube example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- the Usercentrics CMP code -->
    <script id="usercentrics-cmp" data-settings-id="XXX"
            src="https://app.usercentrics.eu/browser-ui/latest/bundle.js" defer=""></script>
    <!-- CSS of this plugin (or your own version) -->
    <link type="text/css" rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/philsch/usercentrics-widgets@main/dist/ucw.min.css"/>
</head>
<body>
<div style="text-align: center; margin: 20px">
    <!-- adjusted Youtube iframe -->
    <iframe width="560" height="315"
            data-src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A" 
            data-uc-id="BJz7qNsdj-7" class="uc-widget"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
</div>
<!-- finally adding this plugin -->
<script src="https://cdn.jsdelivr.net/gh/philsch/usercentrics-widgets@main/dist/ucw.js"></script>
</body>
</html>
```

### :octocat: Find more information 

Please see the [Github project](https://github.com/philsch/usercentrics-widgets) for more information.


