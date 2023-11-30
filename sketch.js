let font;
let font2;

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
let sliderSpacingVertical;
let sliderSpacingHorizontal;
let fontSelect;
let savingImage = false;

let textPattern = [];

let lastColValue = 1;
let lastRowValue = 0;

let lastVerticalValue;
let lastHorizontalValue;


function preload() {
  font = loadFont('GeneralSans-Semibold.otf');
  //font2 = loadFont('DIN Condensed Bold.otf');
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

  //font select
  fontSelect = createSelect();
  fontSelect.position(20, 90);
  fontSelect.option('General Sans');
  fontSelect.option('font2');
  fontSelect.option('font3');
  fontSelect.option('font4');
  fontSelect.selected('General Sans');

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
  saveButton.position(20, height-50);
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

  //slider spacing vertical
  sliderSpacingVertical = createSlider(50, 800, 220, 1);
  sliderSpacingVertical.position(250, height-50);
  sliderSpacingVertical.style('120px');

  //slider spacing horizontal
  sliderSpacingHorizontal = createSlider(50, 1600, 800, 1);
  sliderSpacingHorizontal.position(400, height-50);
  sliderSpacingHorizontal.style('120px');

  lastColValue = sliderColumn.value();
  lastRowValue = sliderRow.value();
  textPattern = [];

  for (let x = 0; x < sliderColumn.value(); x++) {
    for (let y = 0; y < sliderRow.value(); y++) {
      let aText = new animatedText(x * sliderSpacingHorizontal.value(), y * sliderSpacingVertical.value());
      textPattern.push(aText);
    }
  }


  //console.log(this.points.length)
}

function draw() {
  background(colorPickerBG.color());

  box = font.textBounds(textInput.value(), 0, 0, sliderTextSize.value());

  if (sliderColumn.value() != lastColValue || sliderRow.value() != lastRowValue || sliderSpacingVertical.value() !== lastVerticalValue || sliderSpacingHorizontal.value() !== lastHorizontalValue) {
    console.log("change")
    lastColValue = sliderColumn.value();
    lastRowValue = sliderRow.value();

    lastVerticalValue = sliderSpacingVertical.value();
    lastHorizontalValue = sliderSpacingHorizontal.value();

    textPattern = [];
    for (let x = 0; x < sliderColumn.value(); x++) {
      for (let y = 0; y < sliderRow.value(); y++) {
        let aText = new animatedText(x * sliderSpacingHorizontal.value(), y * sliderSpacingVertical.value());
        textPattern.push(aText);
      }
    }
  }

  textPattern.forEach((e) => {e.display()});

  if (!savingImage) {

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
    text('Frame Rate    ' + floor(frameRate()), 20, 750);
    text('Spacing vertical' + '    ' + sliderSpacingVertical.value() , 250, height-60);
    text('Spacing horizontal' + '    ' + sliderSpacingHorizontal.value() , 400, height-60);
  pop()
  } else {
    saveCanvas('creative-typography', 'jpg');
    savingImage = false;
  }


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



  //console.log(textPattern.length);
}

function myInputEvent() {
  console.log('you are typing: ', this.value());
}

function saveImage() {
  savingImage = true;
}

function mousePressed() {
 // let d = dist(mouseX, mouseY, shapeX, shapeY);
 if (mouseX>200) {
    shapeMove = true;
    cursor(MOVE);
  //} else {
  //  shapeMove = false;
  //  cursor(ARROW);
 }
}

function mouseReleased() {
  shapeMove = false;
  cursor(ARROW);
}

function mouseDragged() {
  if (shapeMove) {
    shapeX += mouseX-pmouseX;
    shapeY += mouseY-pmouseY;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}