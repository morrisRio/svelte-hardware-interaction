#define potiPin A0
int potiVal = 0;

void setup() {
  Serial.begin(9600);
  pinMode(potiPin, INPUT);
}

void loop() {
  potiVal = analogRead(potiPin);
  Serial.println(potiVal);
  delay(1);        // delay in between reads for stability
}