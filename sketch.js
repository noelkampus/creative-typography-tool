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
  textInput.position(20, 70);
  textInput.size(120);
  textInput.input(myInputEvent);

  //color picker background
  colorPickerBG = createColorPicker('#FFFFFF');
  colorPickerBG.position(20, 150);

  //color picker strokes
  colorPickerStrokes = createColorPicker('#0008FF');
  colorPickerStrokes.position(20, 220);

  //text size
  sliderTextSize = createSlider(20, 1000, 230);
  sliderTextSize.position(20, 290);
  sliderTextSize.style('120px');

  //rotation
  sliderRotation = createSlider(0.005, 2, 0.005, 0.001);
  sliderRotation.position(20, 360);
  sliderRotation.style('120px');

  //strokeWeight
  sliderStroke = createSlider(1, 20, 1);
  sliderStroke.position(20, 430);
  sliderStroke.style('120px');

  //elements
  radio = createRadio();
  radio.option('line', 'Line');
  radio.option('rectangle', 'Rectangle');
  radio.option('ellipse', 'Ellipse');
  radio.style('120px');
  radio.position(20, 500);
  radio.selected('line');

  //save image
  saveButton = createButton('Save as Image');
  saveButton.position(20, height-60);
  saveButton.mousePressed(saveImage);

  //slider row
  sliderRow = createSlider(1, 20, 1);
  sliderRow.position(20, 570);
  sliderRow.style('120px');

  //slider column
  sliderColumn = createSlider(1, 20, 1);
  sliderColumn.position(20, 640);
  sliderColumn.style('120px');

  //slider scale
  sliderScale = createSlider(0.5, 20, 1, 0.5);
  sliderScale.position(width-200, height-50);
  sliderScale.style('120px');

  //slider extrude
  sliderExtrude = createSlider(1, 400, 30);
  sliderExtrude.position(20, 710);
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
    console.log("change")
    lastColValue = sliderColumn.value();
    lastRowValue = sliderRow.value();
    textPattern = [];
    for (let x = 0; x < sliderColumn.value(); x++) {
      for (let y = 0; y < sliderRow.value(); y++) {
        let aText = new animatedText(x*100, y*100);
        textPattern.push(aText);
      }
    }
  }

  push();
    //title
    push();
      fill(colorPickerStrokes.color());
      textSize(15);
      text('Creative Typography', 20, 30);
    pop();

    fill(colorPickerStrokes.color());
    text('Zoom' + '    ' + sliderScale.value() , width-200, height-60);
    text('Background' + '    ' + colorPickerBG.value() , 20, 140);
    text('Text' + '    ' + colorPickerStrokes.value() , 20, 210);
    text('Font size' + '    ' + sliderTextSize.value() , 20, 280);
    text('Rotation' + '    ' + sliderRotation.value() , 20, 350);
    text('Stroke weight' + '    ' + sliderStroke.value() , 20, 420);
    text('Element' + '    ' + radio.value() , 20, 490);
    text('Row' + '    ' + sliderRow.value() , 20, 560);
    text('Column' + '    ' + sliderColumn.value() , 20, 630);
    text('Extrude' + '    ' + sliderExtrude.value() , 20, 700);
  pop()



  /*//sidebar
  push();
    fill(255);
    strokeWeight(2);
    rect(150, 0, 300, height * 2);

    //title
    push();
      fill(colorPickerStrokes.color());
      textSize(15);
      text('Creative Typography', 20, 30);
    pop();
  pop();*/

  textPattern.forEach((e) => {e.display()});

  //console.log(textPattern.length);
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