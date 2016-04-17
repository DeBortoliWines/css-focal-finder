$(function() {
  var $cssCode, $cssCodeBtn, $hLine, $imgInput, $pText, $vLine, $view1, $view2, calculateImageMetrics, updateCrosshair, imgHeight, imgLeftClicked, imgTopClicked, imgWidth;
  imgWidth = void 0;
  imgHeight = void 0;
  imgLeftClicked = void 0;
  imgTopClicked = void 0;

  $view1 = $('#view-1');
  $view2 = $('#view-2');
  $imgInput = $('#img-input');
  $vLine = $('#v-line');
  $hLine = $('#h-line');
  $cssCode = $('#css-code');
  $cssCodeBtn = $('#css-code-btn');
  $pText = $('.p-text');

  calculateImageMetrics = function() {
    var backgroundPercent, backgroundPercentLeft, backgroundPercentTop, calcHeight, calcWidth, hiddenLeft, hiddenTop, imgAspectRatio, pageHeight, pageWidth;

    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight;
    imgAspectRatio = imgWidth / imgHeight;

    backgroundPercent = $view2.css('background-position').replace(/%/g, '').split(' ');
    backgroundPercentLeft = parseInt(backgroundPercent[0]) / 100;
    backgroundPercentTop = parseInt(backgroundPercent[1]) / 100;

    calcWidth = void 0;
    calcHeight = void 0;
    hiddenLeft = void 0;
    hiddenTop = void 0;
    if (pageHeight * imgAspectRatio < pageWidth) {
      calcWidth = pageWidth;
      calcHeight = pageWidth / imgAspectRatio;

      hiddenLeft = 0;
      hiddenTop = (calcHeight - pageHeight) * backgroundPercentTop;
    } else {
      calcWidth = pageHeight * imgAspectRatio;
      calcHeight = pageHeight;

      hiddenLeft = (calcWidth - pageWidth) * backgroundPercentLeft;
      hiddenTop = 0;
    }
    return {
      calcWidth: calcWidth,
      calcHeight: calcHeight,
      hiddenLeft: hiddenLeft,
      hiddenTop: hiddenTop
    };
  };
  updateCrosshair = function() {
    var adjustedLeft, adjustedTop, c, left, padding, top;

    c = calculateImageMetrics();
    adjustedLeft = imgLeftClicked * c.calcWidth;
    adjustedTop = imgTopClicked * c.calcHeight;
    left = adjustedLeft - c.hiddenLeft - 2;
    top = adjustedTop - c.hiddenTop - 2;

    padding = 9;
    $vLine.css('left', left + 'px');
    $hLine.css('top', top + 'px');
    $cssCodeBtn.add($cssCode).css('left', left + padding + 'px');
    $cssCodeBtn.css('top', top - $cssCodeBtn.height() - padding + 'px');
    $cssCode.css('top', top + padding + 'px');
  };

  window.addEventListener('resize', updateCrosshair);

  $imgInput.on('change', function(e) {
    var file, reader;

    file = e.originalEvent.target.files[0];
    reader = new FileReader();

    reader.addEventListener('load', function() {
      var image;
      image = new Image();
      image.src = reader.result;

      image.addEventListener('load', function() {
        imgWidth = image.width;
        imgHeight = image.height;

        $view1.addClass('hidden');
        $view2.css('background-image', 'url(\'' + reader.result + '\')').removeClass('hidden');
        $cssCodeBtn.click(function(e) {
          e.stopPropagation();
          $cssCode.toggle();
        });

        $cssCode.click(function(e) {
          e.stopPropagation();
        });
        $view2.click(function(e) {
          var c, l, mouseX, mouseY, t;

          mouseX = e.clientX;
          mouseY = e.clientY;
          c = calculateImageMetrics();

          imgLeftClicked = (mouseX + c.hiddenLeft) / c.calcWidth;
          imgTopClicked = (mouseY + c.hiddenTop) / c.calcHeight;
          l = parseInt(imgLeftClicked * 100);
          t = parseInt(imgTopClicked * 100);

          $view2.css('background-position', l + '% ' + t + '%');
          $pText.text(l + '% ' + t + '%');
          updateCrosshair();
        });
      });
    });
    reader.readAsDataURL(file);
  });
});
