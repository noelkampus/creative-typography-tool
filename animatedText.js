class animatedText {

    x = 0;
    y = 0;
  
    translatedX = 0;
    translatedY = 0;
  
    box = "";
  
    points = "";
  
    constructor(x, y) {
      this.x = x;
      this.y = y;
  
      this.box = font.textBounds(textInput.value(), 0, 0, sliderTextSize.value());
      this.points = font.textToPoints(textInput.value(), 0, 0, sliderTextSize.value(), { sampleFactor: 0.1 });
  
      this.translatePosition();
    }
  
    translatePosition() {
      this.translatedX *= this.box.w;
      this.translatedY *= this.box.h;
    }
    display() {
      //textPoints.text('IAD 23', 750, 500);
      this.box = font.textBounds(textInput.value(), 0, 0, sliderTextSize.value());
      this.points = font.textToPoints(textInput.value(), 0, 0, sliderTextSize.value(), { sampleFactor: 0.1 });
      
      this.translatePosition();
  
      //rect(box.x,box.y,box.w,box.h);
      push()
      scale(sliderScale.value());
      translate(this.x,this.y);
      translate(shapeX - this.box.w/2 ,shapeY + this.box.h/2)
      for (let i = 0; i < this.points.length; i++) {
  
        push();
        translate(this.points[i].x, this.points[i].y);
        rotate(frameCount * sliderRotation.value());
        strokeWeight(sliderStroke.value());
        stroke(colorPickerStrokes.color());
        if (radio.value() === 'line') {
            rect(10,10,sliderExtrude.value(),1);
            //line(10, 10, -10, -10);
        } else if (radio.value() === 'rectangle') {
            fill(colorPickerStrokes.color());
            rect(10,10,sliderExtrude.value(),20);
        } else if (radio.value() === 'ellipse') {
            fill(colorPickerStrokes.color());
            ellipse(10,10,sliderExtrude.value(),10);
        } else {
            line(10, 10, -10, -10);
        }
        pop();
      }
      pop()
    }
  
  
  }