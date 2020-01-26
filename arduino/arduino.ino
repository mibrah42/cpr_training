#define USONIC_DIV 58.0
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo
long duration, mm;

void setup() {
  //Serial Port begin
  Serial.begin(115200);
  //Define inputs and outputs
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(11);
  digitalWrite(trigPin, LOW);
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
  mm = (long) (((float) duration / USONIC_DIV) * 100.0);

  Serial.println(mm);
  delay(100);
}