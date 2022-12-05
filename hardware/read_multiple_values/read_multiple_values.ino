#define ledPin 11
String inputString;
int brightness = 0;
String light = "off";


void setup() {
    Serial.begin(9600);
    pinMode(ledPin, OUTPUT);
}

void loop() {

  while (Serial.available()) {
    inputString = Serial.readStringUntil('\n');
    Serial.print("echo: ");
    Serial.print(inputString);
    
    //check which message type it is
    if(inputString[0] == 'b'){
      brightness = inputString.substring(2).toInt();
      Serial.println(" brightness");
    } else if (inputString[0] == 'l') {
      light = inputString.substring(2);
      Serial.println(" light");
    }
  
    if(light == "on") {
      analogWrite(ledPin, brightness);
    } else if (light == "off"){   
      analogWrite(ledPin, LOW);  
    } 
  }
}
