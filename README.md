# corecontrol
### Control Anything With Anything

Copyright 2015, Neyrinck LLC

#### Quickstart

The Core Control system connects things to be controlled by other things over a network such as a LAN or the internet. For example, audio mixer software can be adjusted by a hardware control surface and/or a touch screen control surface. Or a coffee machine can expose its data model so that a phone can turn it on when you say "I want coffee." Core Control provides simple, flexible, fast messaging with additional support for legacy protocols such as OSC and MIDI. Core Control is designed to be very flexible and powerful so that almost anything can control almost anything.

###### JSON, JSON Schema, And JSON Pointers

Core Control is designed using JSON technologies. You do not need to understand JSON to use Core Control, but it can be helpful. 

* JSON Data Interchange Format - https://tools.ietf.org/html/rfc7159
* JSON Schema - json-schema.org
* JSON Pointers - https://tools.ietf.org/html/rfc6901
* JSON Patch - https://tools.ietf.org/html/rfc6901


###### Core Control Modules

Core Control "modules" are things that can control other modules or be controlled by other modules. A module is represented using JSON which is a standard way to represent structured data. JSON schemas are used to define how module data is structured. JSON pointers are used to reference the data within a module. Every module has a "type" value that indicates the kind of module it is. Example types are "model", "surface", "osc", and "midi." The first two types, "model" and "surface" are the core types that let you build incredibly powerful, scalable systems. The second two, "osc" and "midi" provide support for OSC and MIDI messaging.


###### The OSC Module

Many people use Open Sound Control (OSC) for control messaging on a network. OSC has many limitations that Core Control solves. Nonetheless, OSC is simple and useful. Core Control fully supports OSC messaging using its built-in OSC module.

Here is a simple C++ example to send OSC messages with Core Control's OSC module:
```
#include "corecontrol.h"

// set the protocol, address, and port for the OSC module
CCSetProperty("/osc/0", "ipProtocol", "udp");
CCSetProperty("/osc/0", "sendIpAddress", "192.168.1.10");
CCSetProperty("/osc/0", "sendIpPort", 7000);
CCConnect(true, "/osc/0");

// send a float value message with OSC address /volume.
CCSendValue("/osc/0/controls/volume/valueNumber", 0.7);
```
Please note that the OSC message sent has the address '/volume' and can be received by any OSC application. The beginning part of the path, '/osc/controls', tells Core Control to send an OSC message.

Here is a simple C++ example to receive OSC messages with Core Control:
```
#include "corecontrol.h"

// set the protocol and port for receiving messages
CCSetProperty("/osc/0", "ipProtocol", "udp");
CCSetProperty("/osc/0", "receiveIpPort", 7000);

// set the callback function to receive values
CCSetReceiveCallback(receive);
CCConnect(true, "/osc/0");


void receive(const char* jsonPtr, void* data, int length)
{
  if (strcmp(jsonPtr, "/osc/0/controls/volume/valueNumber")
  {
    float receivedValue = (float)data;
  }
}
```
Please note that the OSC message received has the addresss '/volume' and could have been sent by any OSC application. The beginning part of the path, '/osc/controls', indicates that Core Control received an OSC message. The '/valueNumber' part of the path indicates a floating point number was received. The middle part of the path indicates the OSC address of the message. 


###### Core Control Models / Core Control Surfaces

Core Control provides two different module types that are important to understand: "model" and "surface". 

First, it will help to understand the that Core Control uses the model-adapter-view software pattern (https://en.wikipedia.org/wiki/Model–view–adapter), but uses the term "surface" instead of "view." A data "model" is remotely controlled by one or more "surfaces." An "adapter" implements a mapping between a model and surface. It is very important to understand these things:

* A model can be controlled by one or more surfaces simultaneously through adapters.
* A surface typically controls one model through an adapter.
* A surface never assumes it is the only thing controlling a model.
* A model typically has no knowledge of what is controlling it.

Model and surface modules mostly identical except for how they behave. A model receives requests to change control values from surfaces or other sources private to the model.  When a model control value changes for any reason, it must send the change to all connected surfaces. A surface sends requested control value changes to a model. When a surface receives a change to a control value, it updates its user interface. These behaviors allow any number of surfaces to control a module. This is an example of something that OSC can not do.

To connect a model to Core Control, just write some code like this C++ example:

```
#include "corecontrol.h"

// data model
bool MyWidgetDataModel::power = true;
float MyWidgetDataModel::volume = 0.7;
int MyWidgetDataModel::channel = 36;

// setup corecontrol
void MyWidgetDataModel::Setup()
{
  // connect to any Core Control server using TCP
  CCConnect("bidirectional", "tcp", "servers");

  // create a CoreControl module
  CCModule* module = CCModuleCreate("model", "widgetx", "Widget X");
  
  // add controls to the module that reperesent the data model
  CCModuleAddControl(module, "power", "boolean");
  CCModuleAddControl(module, "volume", "continuous");
  CCModuleAddControl(module, "channel", "discrete");
  
  // provide a callback for CoreControl to receive control changes
  CCModuleAddControlObserver(module, WidgetX::ReceiveControlValueNumber);
  
  // set the module control values 
  CCModuleSetValue("power", MyWidgetDataModel::power);
  CCModuleSetValue("volume", MyWidgetDataModel::volume);
  CCModuleSetValue("channel", MyWidgetDataModel::channel);
  
  // connect the module
  CCModuleConnect(module);
}

// this function is called by CoreControl to inform the data model of changes from a remote control surface
void MyWidgetDataModel::ReceiveControlValueNumber(std::string controlName, float controlValue, void* context)
{
  if (controlName.compare("power")==0)
  {
    // update your data model here
    MyWidgetDataModel::power = controlValue;
    // tell core control the new value
    CCModuleSetValue("power", controlValue > 0.5);
  }
  else if (controlName.compare("volume")==0)
  {
    // update your data model here
    MyWidgetDataModel::volume = controlValue;
    // tell core control the new value
    CCModuleSetValue("volume", controlValue);
  }
  else if (controlName.compare("channel")==0)
  {
    // update your data model here
    MyWidgetDataModel::channel = controlValue;
    // tell core control the new value
    CCModuleSetValue("channel", controlValue);
  }
}
```
Now MyWidgetDataModel has connected its controls to CoreControl and it can be controlled remotely by surfaces that are interfaced via adapters. If any model values are changed, the model must call CCModuleSetValue(..) and CoreControl will send the values to any surfaces that are connected via adapters. CoreControl provides other powerful, optional features that you can read more about further down. These features include hierarchical models and surfaces, meters, metadata, discovery, and more.

###### Surfaces

CoreControl surfaces are user interfaces used to remotely control a model. A surface has controls just like a model does, but differs in its behavior. It sends value changes when a user adjusts a control. And when it receives changes to values from CoreControl, it updates the user interface to display the values. To connect a surface to Core Control, just write some code like this C++ example:

```
#include "corecontrol.h"
void MyCuteController::Setup()
{
  CCModule* module = CCModuleCreate("surface", "cutecontrol", "Cute Control");
  CCModuleAddControl(module, "knob", "delta");      // rotary encoder knob
  CCModuleAddControl(module, "up", "momentary");    // momentary push button
  CCModuleAddControl(module, "down", "momentary");  // momentary push button
  CCModuleAddControl(module, "display", "text");		// LCD text display
  CCModuleAddControlObserver(module, MyCuteController::ReceiveControlValueString);
  CCModuleConnect(module);
}

// this is called when the knob turns or a button is pushed
void MyCuteController::DoControlChange(const char* name, float value)
{
  CCModuleSetControlValueNumber(name, value);
}

void MyCuteController::ReceiveControlValueString(const char * controlName, std::string controlValue, void* context)
{
  if strcmp(controlName, "display")
  {
    // update the user interface here
  }
}
```
C++ Projects

To use CoreControl in your C++ project, add these files:
* /includes/corecontrol.h
* /module/corecontrol_interface.cpp
* /module/corecontrol_library.c

To use CoreControl in your javascript project, add this file:
* /js/corecontrol.js

### Core Control - Documentation

###### Core Control Modules

Core Control "modules" represent the models and surfaces connected to Core Control. A module is structured data that an adapter uses to interface it to other modules. Internal to Core Control, a module is represented and manipulated using standard JSON technologies:

* JSON Data Interchange Format - https://tools.ietf.org/html/rfc7159
* JSON Schema - json-schema.org
* JSON Pointers - https://tools.ietf.org/html/rfc6901
* JSON Patch - https://tools.ietf.org/html/rfc6901

Core Control has an easy-to-use software API so that a software programmer does not need to know anything how Core Control uses JSON internally. But a software programmer may find it helpful to understand how flexible, extensible, and powerful the Core Control system is. And a software programmer may need to understand JSON schema to best implement a module.

Here is a partial JSON representation of the MyWidgetDataModel module example:
```
{
  type:'model',
  identifier:'widgetx',
  name:'Widget X',
  controls: {
    power:{...},
    volume:{...},
    channel:{...},
  }
}
```

Here is a partial JSON representation of the Cute Control module example:
```
{
  type:'surface',
  identifier:'cutecontrol',
  name:'Cute Control',
  controls: {
    knob:{...},
    up:{...},
    down:{...},
    display:{...},
  }
}
```
The JSON representation of a module must follow the JSON schema for a Core Control module:

https://github.com/pneyrinck/corecontrol/blob/master/schema/v1/module.json

Note that a module's JSON has a key/value object named "controls." The "controls" object represents the module's controls. 

###### Core Control Controls

Controls are a fundamental part of Core Control. For a model, a control is a piece of the data model exposed so it can be changed for some useful purpose. For a surface, a control is a piece of the user interface that a user interacts with. An adapter can implement a mapping so that as a user changes a surface control, a model control changes. Core Control uses a JSON schema for controls. Here is a partial JSON representation of an audio volume control:
```
{
  type:'continuous',
  name:'Volume',
  valueNumber:0.707,
  valueString:'-3.0',
  minimumValueNumber: 0.0,
  maximumValueNumber: 1.0,
  units:'dB',
  taper:{...}
  enabled:true,
  ....
}
```
The JSON schema for a control requires it to have these key/value pairs:
* type
* valueNumber, valueString, or valueBlob

With these two key/value pairs, a Core Control adapter can map it to a different control in a different module. Additional key/value pairs enhance an adapter's ability to provide a great user experience. Because Core Control uses JSON schema, a wide variety of control schemas can be defined.

You can see the schema for a control here:
https://github.com/pneyrinck/corecontrol/blob/master/schema/v1/control.json


###### Core Control Adapters
An adapter implements a mapping between a model and a surface. Adapters are the powerful glue that lets users "Control Anything With Anything." Core Control is designed so that any model and any surface can potentially be connected with an adapter. An adapter relies on the JSON representation of modules to know how to map them. 


###### Core Control SubModules / Array Modules

A powerful feature of Core Control is submodules. By using submodules you can connect complicated models and surfaces that are organized as multiple modules using parent/child relationships. Array modules are a special type of module that lets you organize a set of submodules that are ordered and indexed.


###### CoolDAW Module Example

To illustrate submodules and module arrays, consider a digital audio software application called "CoolDAW.' CoolDAW has an audio mixer with 1024 tracks, each having a volume and pan control, and a transport section with stop, play, and record controls.

The first module we will create is the top-level parent:
```
{
  type:'model',
  identifier:'cooldaw',
  name:'Cool DAW',
  controls: {}
}
```
Note that it has no controls. The controls will be in sub-modules.

The next module we create is for the transport section:
```
{
  type:'model',
  identifier:'transport',
  name:'Transport',
  controls: {
    'stop':{...},
    'play':{...},
    'record':{...},
  }
}
```
And finally we create 1024 track modules:
```
{
  type:'model',
  identifier:'track',
  name:'Track',
  controls: {
    'fader':{...},
    'pan':{...}
  }
}
```
All 1024 track modules are identical. But they are submodules of the array module which organizes them as an ordered, indexed set.


###### The Controls Object And Meters Object
The Core Control module schema has an object named "controls" and an object named "meters." The "controls" object contains control objects as key/value pairs where the key is the control name. This comes in really handy because we can construct JSON pointers that are simple and readable. Here are some example JSON pointers that point to key/value pairs in control objects:
```
/cooldaw/transport/play/valueNumber
/cooldaw/tracks/0/track/fader/valueString
```

The "meters" object is very similar.

#### Core Control APIs

Core Control provides a low-level module API and a high-level module API built on top of the low-level API. The low-level API assumes an understanding of the Core Control schemas and JSON technologies. The high-level API provides a friendly interface that can be improved, customized, and extended to different langauges.

###### Low-Level Module API

The low-level API is implemented in C and Javascript at this time.
```
struct CoreControlModule* CC_API CCModuleCreate(const char* type, const char * identifier, const char * name, struct CoreControlModule *parent);

void CC_API CCModuleDestroy(struct CoreControlModule *module);

void CC_API CCModuleSetValue(struct CoreControlModule *module, const char* jsonPtr, const char* msgPackData, int msgPackDataSize);

char* CC_API CCModuleGetValue(struct CoreControlModule *module, const char* jsonPtr, int* sizeOut);

void CC_API CCModuleConnect(struct CoreControlModule *module);

void CC_API CCModuleDisconnect(struct CoreControlModule *module);

void CC_API CCModuleAddObserver(struct CoreControlModule* module, CCRecvValueCallback callback, void* context);
void CC_API CCModuleRemoveObserver(struct CoreControlModule* module, CCRecvValueCallback callback, void* context);
```


###### High-Level Module API

Core Control also provides a friendly, high-level API implemented with open-source convenience functions. The high-level API is implemented in C++ and Javascript at this time. The high-level API is open-source for any improvements necessary.


###### Why Not Just Use OSC?

OSC is a simple way to send simple messages between two OSC programs on a network. Each message has an address and a value. Its simplicity makes it very useful but has many limitations:

* The two OSC programs exchanging messages must be using the same message addresses and data types.
* OSC does not provide for more more than one OSC program to be controlling another program.
* The message address inefficently uses a text value that can be any length.
* There is no system for describing and discovering OSC programs on a network.




