# corecontrol
Copyright 2015, Neyrinck LLC

For Core Control documentation and info, please visit the [Core Control Site](http://www.corecontrol.io).

You can use Bower to install Core Control for Javascript systems:
bower install corecontrol

For C/C++ projects, use the files in the /includes and /source directories.

Here is a some example C code to send OSC messages with Core Control:
```
#include "corecontrol.h"

// create a 'surface' module (type, identifier, name)
CCModule* songControlModule = CCCreateModule("surface", "songcontrol", "Song Control");//

// create a UDP service to send and receive messages (service, type, port, address, receive port)
CCConnection* udpService = CCCreateConnection("ccserver._udp", 7000, "192.168.100.1", 7001);

// connect the module to the service
CCConnect(songControlModule, udpConnectio);

// send a float value message with OSC address /volume.
CCSetControlValueFloatOSC(songControlModule, "volume", 0.7);

// send a string value message with OSC address /name/first.
CCSetControlValueStringOSC(songControlModule, "song/artist", "The Hypocrites");

// send a string value message with OSC address /name/last.
CCSetControlValueStringOSC(songControlModule, "song/name", "I Hate Complainers");

```
The OSC messages sent have the OSC addresses '/volume', '/song/artist', 'song/name' and can be sent to any application that is programmed to receive OSC messages.

Here is a simple C example to receive OSC messages with Core Control:
```
#include "corecontrol.h"

// create a 'model' module
CCModule* songPlayerModule = CCCreateModule("model", "songplayer", "Song Player");

// create a UDP connection to send and receive messages (service, type, port, address, receive port)
CCConnection* udpConnection = CCCreateConnection("corecontrol._udp", 7001, "192.168.100.2", 7000);

// set a callback function to receive control property changes
CCSubscribeFPtr(songPlayerModule, "controls", receiveFunction);

// connect the module to the service
CCConnect(songPlayerModule, udpConnection);

void receiveFunction(CCModule* module, std::string path, std::string * key, SCCPropertyValue* value, void* context)
{
  if ((path.compare("controls/volume")==0) && (key.compare("valueNumber"))
  {
    float receivedValue = value->valueFloat;
    ....
  }
  if ((path.compare("controls/song/name")==0) && (key.compare("valueString"))
  {
    const char* receivedStringValue = value->valueString;
    ....
  }
}
```
Core Control provides additional features using CC messaging that make it a powerful, extensible system while also being backwards compatible with OSC messaging.  




Here is example C++ code for a coffee-making robot model:

```
#include "corecontrol.h"

// data model
std::string CoffeeBot2000TM::type = "cappuccino";
int CoffeeBot2000TM::shots = 2;
float CoffeeBot2000TM::progress = 0.0;
bool CoffeeBot2000TM::start = false;

// setup core control
void CoffeeBot2000TM::Setup()
{
  // create a CC module with role = model
  CCModule* coffeeBotModule = CCCreateModule("model", "coffeebot", "Coffee Bot 2000");
  
  // add controls to the module that represent the data model
  CCAddControl(coffeeBotModule, "type", "Type", "string");
  CCAddControl(coffeeBotModule, "shots", "Shots", "indexed");
  CCAddControl(coffeeBotModule, "start", "Start", "continuous");
  CCAddMeter(coffeeBotModule, "progress", "Progress", "continuous");
  
  // add a meter
  CCAddMeter(coffeeBotModule, "progress", "Progress", "float");

  // provide a callback for CoreControl to receive control changes
  CCSubscribe(coffeeBotModule, CoffeeBot2000TM::ReceiveProperty);

  // initialize the module control values 
  CCSetControlValueString(coffeeBotModule, "type", CoffeeBotDataModel::type);
  CCSetControlValueFloat(coffeeBotModule, "progress", CoffeeBotDataModel::progress);
  CCSetControlValueFloat(coffeeBotModule, "shots", CoffeeBotDataModel::shots);
  CCSetControlValueFloat(coffeeBotModule, "start", CoffeeBotDataModel::start);

  CCConnection* receiveConnection = CCCreateConnection("udp", "receive", 7000, "");
  CCConnection* sendConnection = CCCreateConnection("udp", "send", 7001, "192.186.100.1");

  // connect the module to the outside world
  CCConnect(coffeeBotModule, receiveConnection);
  CCConnect(coffeeBotModule, sendConnection);

  // tell the world about the module
  CCPublish(coffeeBotModule);
}

// this function is called by CoreControl to inform the data model of requested changes from a surface
void CoffeeBot2000TM::ReceiveProperty(CCModule* module, std::string path, std::string * key, SCCPropertyValue* value, void* context)
{
  if ((path.compare("controls/start")==0) && (key.compare("valueNumber"))
  {
    // start making coffee if value is affirmative
    if (value->valueInteger > 0)
      CoffeeBot2000TM::RunMakeCoffeeThread();
  }
  else if ((path.compare("controls/shots")==0) && (key.compare("valueNumber"))
  {
    // update data model
    CoffeeBot2000TM::shots = value->valueNumber;
  // broadcast info to surface(s)
    CCSetControlValueFloat(coffeeBotModule, "shots", value->valueNumber);
  }
  else if ((path.compare("controls/type")==0) && (key.compare("valueString"))
  {
    // update data model
    CoffeeBot2000TM::type = value->valueString;
  // broadcast info to surface(s)
    CCSetControlValueString(coffeeBotModule, "type", CoffeeBot2000TM::type);
  }
}

void CoffeeBot2000TM::MakeCoffeeThread()
{
  // broadcast info to surface(s)
  CCSetControlValueFloat(module, "start", 1);
  float progress = 0.0;
  bool coffeeMaking = true;
  while (coffeeMaking)
  {
...
  CCSetMeterValueFloat(module, "progress", progress);
...
  }
  CCSetControlValueFloat(module, "start", 0);
  CCSetMeterValueFloat(module, "progress", 1.0);
}


```
CoffeeBot2000TM is a data model that describes its controls and meters and connects to Core Control. Any Core Control application connected can observe that there is a module connected named "Coffee Bot 2000", that its role is a model, and info about its controls. It can receive CC or OSC protocol messages requesting it to change a value.

Because its role is a model, if any model values are changed, the model must call CCSetControlValueXXX(..) and Core Control will send the values to any surfaces it is connected to. Core Control provides other powerful, optional features that you can read more about further down. These features include hierarchical modules, meters, metadata, discovery, and more.

To connect a surface to Core Control, just write some code like this C++ example:

```
#include "corecontrol.h"
CCModule* module;
void MyCuteController::Setup()
{
  module = CCModuleCreate("surface", "cutecontrol", "Cute Control");
  CCModuleAddControl(module, "knob", "Adjust", "delta");      // rotary encoder knob
  CCModuleAddControl(module, "up", "Previous", "momentary");    // momentary push button
  CCModuleAddControl(module, "down", "Next", "momentary");  // momentary push button
  CCModuleAddControl(module, "display", "Value", "text");		// LCD text display
  CCSubscribe(module, "controls", MyCuteController::ReceiveProperty);
  CCModuleConnect(module, connection);
}

// this is called when the knob turns or a button is pushed
void MyCuteController::DoControlChange(const char* identifier, int value)
{
  CCSetControlValueFloat(module, identifier, value);
}

void MyCuteController::ReceiveProperty(module, std::string path, std::string key, SCCPropertyValue* value, void* context)
{
  if path.compare("controls/display")
  {
    // update the user interface here
  }
}
```



