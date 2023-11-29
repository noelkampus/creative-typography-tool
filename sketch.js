let font;
let fontSize = 200;
let points;
let box;

let shapeX;
let shapeY;
let shapeMove = false;

let sliderRotation;
let sliderStroke;
let textInput;
let colorPickerBG;
let colorPickerStrokes;
let sliderRow;
let sliderScale;

let textPattern = [];

let lastColValue = 1;
let lastRowValue = 0;



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
  draw() {
    //textPoints.text('IAD 23', 750, 500);
    this.box = font.textBounds(textInput.value(), 0, 0, sliderTextSize.value());
    this.points = font.textToPoints(textInput.value(), 0, 0, sliderTextSize.value(), { sampleFactor: 0.1 });
    
    this.translatePosition();

    //rect(box.x,box.y,box.w,box.h);
    translate(shapeX - this.box.w/2 ,shapeY + this.box.h/2)
    scale(sliderScale.value());
    for (let i = 0; i < this.points.length; i++) {

      if (radio.value() === 'line') {

        push();
          translate(this.points[i].x, this.points[i].y);
          rotate(frameCount * sliderRotation.value());
          strokeWeight(sliderStroke.value());
          stroke(colorPickerStrokes.color());
          rect(10,10,sliderExtrude.value(),1);
          //line(10, 10, -10, -10);
        pop();

      } else if (radio.value() === 'rectangle') {
        
        push();
          translate(this.points[i].x, this.points[i].y);
          rotate(frameCount * sliderRotation.value());
          fill(colorPickerStrokes.color());
          stroke(colorPickerStrokes.color());
          strokeWeight(sliderStroke.value());
          rect(10,10,sliderExtrude.value(),10);
          //rect(10,10,random(30),random(30));
        pop();

      } else if (radio.value() === 'ellipse') {

        push();
          translate(this.points[i].x, this.points[i].y);
          rotate(frameCount * sliderRotation.value());
          fill(colorPickerStrokes.color());
          stroke(colorPickerStrokes.color());
          strokeWeight(sliderStroke.value());
          ellipse(10,10,sliderExtrude.value(),10);
        pop();

      } else {

        push();
          translate(this.points[i].x, this.points[i].y);
          rotate(frameCount * sliderRotation.value());
          strokeWeight(sliderStroke.value());
          stroke(colorPickerStrokes.color());
          line(10, 10, -10, -10);
        pop();

      }
    }
  }
}


function preload() {
  font = loadFont('GeneralSans-Semibold.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textFont(font);

  shapeX = width/2;
  shapeY = height/2;

  //input
  textInput = createInput('IAD 23');
  textInput.position(20, 50);
  textInput.size(120);
  textInput.input(myInputEvent);

  //color picker background
  colorPickerBG = createColorPicker('#FFFFFF');
  colorPickerBG.position(20, 100);

  //color picker strokes
  colorPickerStrokes = createColorPicker('#000000');
  colorPickerStrokes.position(20, 150);

  //text size
  sliderTextSize = createSlider(20, 1000, 200);
  sliderTextSize.position(20, 200);
  sliderTextSize.style('120px');

  //rotation
  sliderRotation = createSlider(0.005, 20, 0.005);
  sliderRotation.position(20, 250);
  sliderRotation.style('120px');

  //strokeWeight
  sliderStroke = createSlider(1, 20, 1);
  sliderStroke.position(20, 300);
  sliderStroke.style('120px');

  //elements
  radio = createRadio();
  radio.option('line', 'Line');
  radio.option('rectangle', 'Rectangle');
  radio.option('ellipse', 'Ellipse');
  radio.style('120px');
  radio.position(20, 350);
  radio.selected('line');

  //save image
  saveButton = createButton('Save as Image');
  saveButton.position(20, height-80);
  saveButton.mousePressed(saveImage);

  //slider row
  sliderRow = createSlider(1, 20, 1);
  sliderRow.position(20, 400);
  sliderRow.style('120px');

  //slider column
  sliderColumn = createSlider(1, 20, 1);
  sliderColumn.position(20, 420);
  sliderColumn.style('120px');

  //slider scale
  sliderScale = createSlider(0.5, 20, 1);
  sliderScale.position(width-200, height-50);
  sliderScale.style('120px');

  //slider extrude
  sliderExtrude = createSlider(1, 50, 30);
  sliderExtrude.position(20, 500);
  sliderExtrude.style('120px');

  lastColValue = sliderColumn.value();
    lastRowValue = sliderRow.value();
    textPattern = [];

  for (let x = 0; x < sliderColumn.value(); x++) {
    for (let y = 0; y < sliderRow.value(); y++) {
      let aText = new animatedText(x, y);
      textPattern.push(aText);
    }
  }


  //console.log(this.points.length)
}

function draw() {
  background(colorPickerBG.color());

  box = font.textBounds(textInput.value(), 0, 0, sliderTextSize.value());

  if (sliderColumn.value() != lastColValue || sliderRow.value() != lastRowValue) {
    lastColValue = sliderColumn.value();
    lastRowValue = sliderRow.value();
    textPattern = [];

    for (let x = 0; x < sliderColumn.value(); x++) {
      for (let y = 0; y < sliderRow.value(); y++) {
        let aText = new animatedText(x, y);
        textPattern.push(aText);
      }
    }
  }

  //title
  push();
    fill(colorPickerStrokes.color());
    textSize(15);
    text('Creative Typography', 20, 30);
  pop();

  textPattern.forEach((e) => {e.draw()});

  console.log(textPattern)
}

function myInputEvent() {
  console.log('you are typing: ', this.value());
}

function saveImage() {
  saveCanvas('creative-typography', 'jpg');
}

function mousePressed() {
  let d = dist(mouseX, mouseY, shapeX, shapeY);
  if (d < box.w/2) {
    shapeMove = true;
    cursor(MOVE);
  } else {
    shapeMove = false;
    cursor(ARROW);
  }
}

function mouseReleased() {
  shapeMove = false;
}

function mouseDragged() {
  if (shapeMove) {
    shapeX = mouseX;
    shapeY = mouseY;
  }
}