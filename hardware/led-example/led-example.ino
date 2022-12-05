#define ledPin 12
String inputString;


void setup() {
    Serial.begin(9600);
    pinMode(ledPin, OUTPUT);
    digitalWrite(12, HIGH);
}

void loop() {

  while (Serial.available()) {
    inputString = Serial.readStringUntil('\n');
    Serial.print("echo: ");
    Serial.println(inputString);
  
    Serial.println("ARDUINO SAGT: Alles klar, led ist ");

    
    if(inputString == "on") {
      digitalWrite(ledPin, HIGH);
      Serial.println("an"); 
    } else if (inputString == "off"){   
      digitalWrite(ledPin, LOW);
      Serial.println("aus");    
    } else {
       Serial.print("keins von beidem weil String ist: ");
      Serial.println(inputString);
    }
  }
}
