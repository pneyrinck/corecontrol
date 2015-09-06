# corecontrol
### Control Anything With Anything

Copyright 2015, Neyrinck LLC

#### Quickstart

The Core Control system connects things to be controlled by other things over a network. For example, audio mixer software can be adjusted by a hardware control surface with knobs and sliders. Or a coffee machine can make coffee when you say "I want a latte with two shots" to a smartphone. Or a virtual reality glove can control a surgical instrument. Core Control provides simple, flexible, fast messaging and supports legacy protocols such as OSC and MIDI and supports the new OCI (open control interface) protocol. Core Control is designed to be very flexible and powerful so that anything can control anything.

###### JSON, JSON Schema, And JSON Pointers

Core Control is designed using JSON technologies. You do not need to understand JSON to use Core Control, but it can be helpful. 

* JSON Data Interchange Format - https://tools.ietf.org/html/rfc7159
* JSON Schema - json-schema.org
* JSON Pointers - https://tools.ietf.org/html/rfc6901
* JSON Patch - https://tools.ietf.org/html/rfc6901


###### Core Control Modules

A Core Control "module" encapsulates a set of controls and an object that uses those controls. The control values can be sent to other modules and control value changes can be received from other modules. Modules can also send and receive property and configuration messages. A module is represented using JSON which is a standard way to represent structured data. JSON schemas are used to define how module data is structured. JSON pointers are used to reference the data within a module. Every module has a "type" property that specifies the kind of module it is. Example types are "oci", "osc", and "midi." The first type, "oci" is the core type that let you build incredibly powerful, scalable systems. The second two, "osc" and "midi" provide support for legacy systems using OSC and MIDI messaging. Core Control is extensible to support additional messaging systems.


###### Legacy OSC And MIDI Modules

Open Sound Control (OSC) is popular for control messaging on a network because it is simple. Core Control fully supports OSC messaging using OSC modules. MIDI is a popular protocol for messaging music performance and control  messsages. Core Control supports MIDI messaging using MIDI modules.

Here is a simple C++ example to send OSC messages with Core Control:
```
#include "corecontrol.h"
unsigned char blobdata[100];

// create an OSC module
CCModule* module = CCModuleCreate("osc", "widgetx", "Widget X");
// create a socket to send messages
CCSocket* socket = CCSocketCreate("udp", "192.168.100.1:7000");
// connect the OSC module to the socket
CCConnect(true, module, socket);

// send a float value message with OSC address /volume.
CCSetControlValue(module, "/volume/valueFloat", 0.7);
// send a string value message with OSC address /volume.
CCSetControlValue(module, "/name/valueString", "John Doe");
// send an integer value message with OSC address /volume.
CCSetControlValue(module, "/year/valueInteger", 1963);
// send a blob value message with OSC address /volume.
CCSetControlValue(module, "/data/valueBlob", blobdata, 100);
```
Please note that the OSC messages sent have the OSC addresses '/volume', '/name', '/year', and '/data' and can be sent to any OSC application.

The JSON representation for this OSC module is:
```
{
  type:'osc',
  identifier:'widgetx',
  name:'Widget X',
  controls: {
    'volume':{
      valueFloat:0.7
    },
    'name':{
      valueString:'John Doe'
    },
    'year':{
      valueInteger:1963
    }
  }
}
```
Here is a simple C++ example to receive OSC messages with Core Control:
```
#include "corecontrol.h"

// create an OSC module
CCModule* module = CCModuleCreate("osc", "widgetx", "Widget X");
// create a socket to receive messages
CCSocket* socket = CCSocketCreate("udp", "receive", 7001);

// set a callback function to receive values
CCModuleAddControlObserver(module, receive);
CCConnect(true, module, socket);

void receiveControlValueFloat(std::string controlName, float controlValue)
{
  if (controlName.compare("volume")==0)
  {
    float receivedValue = controlValue;
  }
}
```
Please note that the OSC message received has the addresss '/volume' and could have been sent by any OSC application.

As you can see Core Control provides basic OSC messaging using its software API. As you will see below, Core Control provides additional features with OCI messaging that make it a powerful, extensible system.  


###### OCI (Open Control Interface) Modules

The OSC protocol is very good, but it has many limitations.

* The message address inefficently uses a text value that can be any length which limits its scalability.
* There is no system for describing and discovering OSC programs on a network.
* Two OSC programs exchanging messages must be using the same message addresses and data types.
* OSC programs are not modular. All controls are organized into a single flat space.
* OSC does not provide for more more than one OSC program to be controlling another program.

The OCI protocol is designed to solve these limitations. OCI messages are tiny no matter how large the system is and no matter what the control addresses are. OCI lets modules describe themselves with rich metadata. OCI provides hierarchical sub-modules for modular and organized control. OCI allows any number fo control surfaces to be controlling a model. 


###### Core Control Module Roles

Core Control modules can specify their role as a data 'model' or a control 'surface' which is very simple distinction, but incredibly important. Core Control uses the software design pattern known as 'model-view-adapter' which is described here: https://en.wikipedia.org/wiki/Model–view–adapter. Core Control modules can specify their role and implement the behavior appropriate to that role. There are two roles at this time: "model" and "surface". The "surface" role is equivalent to the "view" role in the 'model-view-adapter' pattern. A data "model" is remotely controlled by one or more "surfaces." An "adapter" implements a mapping between a model and surface so that almost anything can control almost anything.  It is helpful to understand these things about model and surface roles:

* A model can be controlled by one or more surfaces simultaneously through adapters.
* A surface typically controls a model through an adapter.
* A surface never assumes it is the only thing controlling a model.
* A model typically has no knowledge of what is controlling it.

Model and surface modules are technically identical, but behave slightly different according to their role. A model receives requests to change control values from surfaces or other sources private to the model.  When a model control value changes for any reason, it must send the change to all connected adapters which forward the value changes to surfaces. A surface sends requested control value changes to a model through an adpater. When a surface receives a change to a control value, it updates its user interface. These behaviors allow any number of surfaces to simultaneously control a single data model.

Here is example C++ code for a model that has four values that can be controlled:

```
#include "corecontrol.h"

// data model
std::string CoffeeBotDataModel::type = "cappuccino";
int CoffeeBotDataModel::shots = 2;
float CoffeeBotDataModel::progress = 0.0;
bool CoffeeBotDataModel::make = false;

// setup core control
void CoffeeBotDataModel::Setup()
{
  // create a OCI module with role = model
  CCModule* module = CCModuleCreate("oci", "coffeebot", "Coffee Bot", "model");
  
  // create a socket to send and receive messages to a core control websocket server
  CCSocket* socket = CCSocketCreate("tcp", "ws://192.168:100.1:8080/models");

  // add controls to the module that reperesent the data model
  CCModuleAddControl(module, "type", "Type", "string");
  CCModuleAddControl(module, "progress", "Progress", "continuous");
  CCModuleAddControl(module, "shots", "Shots", "integer");
  CCModuleAddControl(module, "start", "Start", "integer");
  
  // provide a callback for CoreControl to receive control changes
  CCModuleAddControlObserver(module, CoffeeBotDataModel::ReceiveControlValueNumber);
  CCModuleAddControlObserver(module, CoffeeBotDataModel::ReceiveControlValueString);

  // initialize the module control values 
  CCModuleSetValue("type", CoffeeBotDataModel::type);
  CCModuleSetValue("progress", CoffeeBotDataModel::progress);
  CCModuleSetValue("shots", CoffeeBotDataModel::shots);
  CCModuleSetValue("start", CoffeeBotDataModel::start);
  
  // connect the module to the server
  CCConnect(true, module, socket);
}

// this function is called by CoreControl to inform the data model of changes from a remote control surface
void CoffeeBotDataModel::ReceiveControlValueNumber(std::string controlName, double controlValue, void* context)
{
  if (controlName.compare("make")==0)
  {
    // update your data model here
    MyWidgetDataModel::make = controlValue;
    // tell core control the new value
    CCModuleSetValue("make", controlValue > 0.5);
  }
  else if (controlName.compare("progress")==0)
  {
    // update your data model here
    MyWidgetDataModel::progress = controlValue;
    // tell core control the new value
    CCModuleSetValue("progress", controlValue);
  }
  else if (controlName.compare("shots")==0)
  {
    // update your data model here
    MyWidgetDataModel::shots = controlValue;
    // tell core control the new value
    CCModuleSetValue("shots", controlValue);
  }
  
  void CoffeeBotDataModel::ReceiveControlValueString(std::string controlName, std::string controlValue, void* context)
  {
    if (controlName.compare("type")==0)
    {
      // update your data model here
      MyWidgetDataModel::type = controlValue;
      // tell core control the new value
      CCModuleSetValue("type", controlValue > 0.5);
    }
  }
}
```
Now CoffeeBotDataModel has described its controls and connected to Core Control. Now any other Core Control application can observe that there is a module connected named "Coffee Bot", that its role is a model, and info about its controls. 

Because its role is model, if any model values are changed, the model must call CCModuleSetValue(..) and Core Control will send the values to any surfaces that are connected via adapters. Core Control provides other powerful, optional features that you can read more about further down. These features include hierarchical models and surfaces, meters, metadata, discovery, and more.

###### Surfaces

Core Control surfaces are user interfaces used to remotely control a model. A surface has controls just like a model does, but differs in its behavior. It sends value changes when a user adjusts a control. And when it receives changes to values from CoreControl, it updates the user interface to display the values. To connect a surface to Core Control, just write some code like this C++ example:

```
#include "corecontrol.h"
void MyCuteController::Setup()
{
  CCModule* module = CCModuleCreate("surface", "cutecontrol", "Cute Control");
  CCModuleAddControl(module, "knob", "Adjust", "delta");      // rotary encoder knob
  CCModuleAddControl(module, "up", "Previous", "momentary");    // momentary push button
  CCModuleAddControl(module, "down", "Next", "momentary");  // momentary push button
  CCModuleAddControl(module, "display", "Value", "text");		// LCD text display
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
###### Core Control API

Core Control is implemented with a code library that provides an API to make it easy to integrate Core Control into hardware and software projects.

C++ Projects

To use CoreControl in your C++ project, add these files:
* /includes/corecontrol.h
* /module/corecontrol_interface.cpp
* /module/corecontrol_library.c

To use CoreControl in your javascript project, add this file:
* /js/corecontrol.js

### Going Deeper - Core Control Documentation

###### Core Control Modules

This provides a deeper look at modules which are the heart and soul of Core Control. Modules are a structured data representation of an application / widget that is using Core Control. JSON is used to represent modules. The layout of the JSON must follow a defined schema.

Here is a partial JSON representation of the MyWidgetDataModel module example from above:
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
The JSON schema for a Core Control module can be seen here:

https://github.com/pneyrinck/corecontrol/blob/master/schema/v1/module.json

Note that a module's JSON has a key/value object named "controls." The "controls" object provides info about the module's controls. Because it follows a schema, other applications can look at the JSON and know what a module's controls are. 

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

A powerful feature of Core Control is submodules. By using submodules you can connect models and surfaces that are organized as multiple modules using parent/child relationships. Array modules are a special type of module that lets you organize a set of submodules that are ordered and indexed.


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





