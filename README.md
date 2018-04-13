CSS Focal Finder
===
When you're using `background-size: cover`, this tool helps you find the background-position percents that will make your image look awesome on every device.

[Demo](https://debortoliwines.github.io/css-focal-finder/)

How To Use
===
Simply click "Choose Image", select an image. Click a point on the image and resize your browser! Play around with the point until it scales/crops nicely. Record the percents that scale/crop that play the best with your focal point.

*Tip: you can click the percents label to see the exact CSS required.*

The Basics
===
CSS3 is pretty neat, you can do all sorts of cool things with it. For example, you can set a background image's size to cover which will scale and/or crop the image so that it is as small as possible while ensuring that both dimensions are greater than or equal to the corresponding size of the container. This gives you the power to set fullscreen responsive backgrounds.

The following CSS will do this just nicely:

```
background-image: url("your-image.jpg");
background-size: cover;
background-repeat: no-repeat;
background-attachment: fixed;
```

Which on a desktop will produce something along the lines of:

<img src="https://css-focal-finder.appspot.com/img/desktop.png" height="300">

[See the example](https://css-focal-finder.appspot.com/cover-example.html). Try playing around with the aspect ratio of the window to get an intuitive feel of how and when it scales and/or crops.

The Problem
=====
This isn't great because when you shrink down to a mobile portrait aspect ratio, you get something crazy like the following:

<img src="https://css-focal-finder.appspot.com/img/iphone.png" height="300">

Disappointing. It has cropped everything to the right.

We've lost the eye-catching part of the image (the boat and the sun?) that gives it flair.

The Solution
=====
Luckily, we can find our way around this problem.

The `background-position` property sets a kind of "focal point" or "offset" by which the image will be scalled and cropped around.

To adjust the focal point, we adjust the position of the image in CSS based on the percent of the width and height of the image and the browser will do the rest.

By default the `background-position` is `0% 0%` (positioned top-left corner) which you can see from the cover example mentioned.

For example to keep the focal point in the exact center of the image we would use: `background-position: 50% 50%`.

The tricky part comes when the focal point isn't straight-forward. The app on this page helps you visually find the `background-position` percents that will work on every device regardless of the aspect ratio.

Using this tool, I found that the optimal `background-position` percents were `60% 60%`. These percents work on a whole range of devices and is a massive improvement. [See it yourself](https://css-focal-finder.appspot.com/cover-60-60-example.html).

The affect of `background-position: 60% 60%` on a desktop aspect ratio:

<img src="https://css-focal-finder.appspot.com/img/desktop-crosshair.png" height="300">

The affect of `background-position: 60% 60%` on a mobile aspect ratio:

<img src="https://css-focal-finder.appspot.com/img/iphone-crosshair.png" height="300">

---

Tool licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0). See the [LICENSE](/LICENSE) file.

Example image
&copy; 2012 Bernard Gray <bernard.gray@gmail.com>, licensed under Creative Commons Share-alike (CC BY-SA)
Version 4.0 or later,
http://creativecommons.org/licenses/by-sa/4.0/
