# corecontrol
### Control Anything With Anything

Copyright 2015, Neyrinck LLC

#### Like OSC On Steroids

The Core Control system connects things to be controlled by other things over a network. For example, audio mixer software can be adjusted by a hardware control surface with knobs and sliders. Or a virtual reality glove can control a surgical instrument. Core Control provides simple, flexible, fast messaging with the new CC protocol that is backwards compatibile with OSC (open Sound Control) protocol. The Core Control system and the new CC protocol are like OSC on steroids. Core Control is flexible and powerful so that anything can control anything. The Core Control open source code makes it easy to implement modules that communicate CC protocol and OSC protocol.

Here is a some example C code to send OSC messages with Core Control:
```
#include "corecontrol.h"

// create a 'surface' module (type, identifier, name)
CCModule* songControlModule = CCCreateModule("surface", "songcontrol", "Song Control");//

// create a socket to send messages (transport, type, port, address)
CCSocket* sendSocket = CCCreateSocket("udp", "send", 7000, "192.168.100.1");

// connect the module to the socket
CCConnect(songControlModule, sendSocket);

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

// create a socket to receive messages
CCSocket* receiveSocket = CCCreateSocket("udp", "receive", 7000, "");

// set a callback function to receive control property changes
CCSubscribeFPtr(songPlayerModule, "controls", receiveFunction);

// connect the module to the socket
CCConnect(songPlayerModule, receiveSocket);

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
As you can see above, Core Control provides OSC messaging using its software API. As you will see below, Core Control provides additional features using CC messaging that make it a powerful, extensible system while also being backwards compatible with OSC messaging.  


###### CC Protocol

While Core Control supports OSC protocol, it provides the new CC message protocol which solves limitations of OSC. CC protocol messages for realtime control are very small no matter how complex of a system is built. CC messages can be binary or text and can be sent over a wire using any transport layer such as UDP, TCP, and MIDI Sysex. One type of CC message is an OSC message which makes it  very easy to connect Core Control modules to legacy OSC systems. The CC protocol provides other message types that let you build systems easily that can go way beyond what OSC is capable of. Core Control uses web sockets for TCP messaging which makes it easy to use in web browsers, servers, and the internet. 


###### Core Control Modules

A Core Control "module" is a thing that sends and receives CC messages. Core Control modules have properties that describe the module. A module is represented using JSON (Javascript Object Notation) which is a standard way to represent structured data. JSON schemas are used to define how a module is structured. JSON pointers are used to reference the data within a module. You do not need to understand JSON to use Core Control, but it can be helpful.
```
* JSON Data Interchange Format - https://tools.ietf.org/html/rfc7159
* JSON Schema - json-schema.org
* JSON Pointers - https://tools.ietf.org/html/rfc6901
* JSON Patch - https://tools.ietf.org/html/rfc6901
```

The JSON representation for the surface module in the first code example above is:
```
{
    type:'surface',
    identifier:'songcontrol',
    name:'Song Control',
    controls: {
    'volume':{
      valueFloat:0.7
    },
    'artist/song':{
      valueString:'John'
    },
    'artist/name':{
      valueString:'Doe'
    }
  }
}
```

An important module property is the 'controls' property which describes a module's controls that can be used for realtime control. A control has properties that can be sent to other modules and control property changes can be received from other modules. Two important control properties are the 'valueFloat' and 'valueString' properties that can be sent in a message over a wire very fast using very little bandwidth. A module has a 'role' that defines its behavior when it receives messages so that controllers and data models can behave properly. Modules are 'modular' and provide useful features including hierarchical modules, meters, metadata, discovery, and more. 

Every module has a "type" property that specifies the kind of module it is. Current types are "surface" and "model". "midi" might be a future type. The first two types are core types that let you build extensible, powerful, scalable systems that are backwards compatible with OSC message sending and receiving.


###### Core Control Module Roles

A Core Control module's behavior depends on whether it is a 'model' or a 'surface' which is very simple distinction, but incredibly important. Core Control uses the software design pattern known as 'model-view-adapter' which is described here: https://en.wikipedia.org/wiki/Model–view–adapter. Core Control modules must implement a behavior appropriate to its role. There are two roles at this time: "model" and "surface". The "surface" role is equivalent to the "view" role in the 'model-view-adapter' pattern. A data "model" is remotely controlled by one or more "surfaces." An optional "adapter" implements a mapping between a model and surface so that almost anything can control almost anything.It is helpful to understand these things about model and surface roles:

* A model can be controlled by one or more surfaces simultaneously.
* A surface typically controls a model.
* A surface never assumes it is the only thing controlling a model.
* A model typically has no knowledge of what is controlling it.

Model and surface modules are technically identical, but behave slightly different according to their role. A model receives requests to change control values from surfaces or other internal sources private to the model.  When a model control value changes for any reason, it must send the change to all connected destinations. A surface sends a control value to request a change to a model. When a surface receives a change to a control value, it must updates its user interface. These behaviors allow any number of surfaces to simultaneously control a single data model.

Here is example C++ code for a coffee-making robot model:

```
#include "corecontrol.h"

// data model
std::string CoffeeBot2000TM::type = "cappuccino";
int CoffeeBot2000TM::shots = 2;
float CoffeeBot2000TM::progress = 0.0;

// setup core control
void CoffeeBot2000TM::Setup()
{
  // create a CC module with role = model
  CCModule* coffeeBotModule = CCCreateModule("model", "coffeebot", "Coffee Bot 2000");
  
  // add controls to the module that represent the data model
  CCAddControl(coffeeBotModule, "type", "Type", "string");
  CCAddControl(coffeeBotModule, "shots", "Shots", "integer");
  CCAddControl(coffeeBotModule, "start", "Start", "bool");
  
  // add a meter
  CCAddMeter(coffeeBotModule, "progress", "Progress", "float");

  // provide a callback for CoreControl to receive control changes
  CCSubscribe(coffeeBotModule, CoffeeBot2000TM::ReceiveProperty);

  // initialize the module control values 
  CCSetControlValueString(coffeeBotModule, "type", CoffeeBotDataModel::type);
  CCSetControlValueFloat(coffeeBotModule, "progress", CoffeeBotDataModel::progress);
  CCSetControlValueFloat(coffeeBotModule, "shots", CoffeeBotDataModel::shots);
  CCSetControlValueFloat(coffeeBotModule, "start", CoffeeBotDataModel::start);

  CCSocket* receiveSocket = CCCreateSocket("udp", "receive", 7000, "");
  CCSocket* sendSocket = CCCreateSocket("udp", "send", 7001, "192.186.100.1");

  // connect the module to the outside world
  CCConnect(coffeeBotModule, receiveSocket);
  CCConnect(coffeeBotModule, sendSocket);

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
  CCModuleSetValueInt(module, "start", 1);
  float progress = 0.0;
  bool coffeeMaking = true;
  while (coffeeMaking)
  {
...
  CCModuleSetMeterValueFloat(module, "progress", progress);
...
  }
  CCModuleSetValueInt(module, "start", 0);
  CCModuleSetMeterValueFloat(module, "progress", 1.0);
}


```
CoffeeBot2000TM is a data model that describes its controls and connects to Core Control. Any Core Control application connected can observe that there is a module connected named "Coffee Bot 2000", that its role is a model, and info about its controls. It can receive CC protocol messages or OSC protocol messages requesting it to change a value.

Because its role is a model, if any model values are changed, the model must call CCSetControlValueXXX(..) and Core Control will send the values to any surfaces it is connected to. Core Control provides other powerful, optional features that you can read more about further down. These features include hierarchical modules, meters, metadata, discovery, and more.

###### Surfaces

Core Control surfaces are user interfaces used to remotely control a model. A surface has controls with properties just like a model does, but differs in its behavior. It sends control property changes when a user adjusts a control. And when it receives changes to properties from CoreControl, it updates the user interface to display the values. To connect a surface to Core Control, just write some code like this C++ example:

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
  CCModuleConnect(module, socket);
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


###### CC Protocol vs OSC Protocol

The OSC message format is very good, but it has many limitations.

* The message address inefficently uses a text value that can be any length which limits scalability.
* There is no system for describing OSC modules and OSC controls on a network.
* Two OSC programs exchanging messages must be using the same message addresses and data types.
* OSC programs are not modular. All controls are organized into a single flat space.
* OSC does not provide for more more than one OSC program to be controlling another program.
* OSC does not provide for control properties other than a numeric or string value.

The CC message format is designed to solve these limitations. CC control value messages are tiny no matter how large the system is and no matter what the control addresses are. CC lets modules and control describe themselves with rich metadata. CC provides hierarchical sub-modules for modular and organized control. CC allows any number of control surfaces to be controlling a single data model. 


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
  identifier:'coffeebot',
  name:'Coffee Bot',
  controls: {
    start:{...},
    type:{...},
    shots:{
      index:2,
      type:'indexed',
      name:'Shots',
      valueFloat:2.0,
    },
  meters:{
    progress:{...},
    }
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

Note that a module's JSON schema requires an object named "controls." The "controls" object provides info about the module's controls. Because it follows a schema, other applications can look at the JSON and know what a module's controls are.

###### Core Control Controls

Controls are a fundamental part of Core Control. For a model, a control is a piece of the data model exposed so it can be changed for some useful purpose. For a surface, a control is a piece of the user interface that a user interacts with. An adapter can implement a mapping so that as a user changes a surface control, a model control changes. Core Control uses a JSON schema for controls. Here is a partial JSON representation of an audio volume control with a rich set of properties:
```
{
  identifier:'volume',
  index:2,
  type:'continuous',
  feedbackType:'continuous',
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
* identifier
* index
* type

With knowledge of these key/value pairs, a Core Control program send values to this module and control it. Additional key/value pairs enhance a program's ability to provide a great user experience. In the example above, it provides onfo about the fader taper which lets a controlling application draw line marks in a user interface. Because Core Control uses JSON schema, a wide variety of control schemas can be defined.

You can see the schema for a control here:
https://github.com/pneyrinck/corecontrol/blob/master/schema/v1/control.json


###### Core Control Adapters

An adapter implements a mapping between a model and a surface. Adapters are the powerful glue that lets users "Control Anything With Anything." An adapter is not needed if a model and a surface have knowledge of each other's controls and can adapt themselves to each other. But that is a very self-limiting way to build a system. Rather a model should be able to be built with no knowledge of what surface will control it. And it should be controllable by a variety of controllers. Core Control is designed so that any model and any surface can potentially be connected via an adapter. An adapter relies on the JSON representation of modules to know how to map control values between them. A popular Core Control adapter system that is available for Mac and PC is V-Control Pro(vcontrolpro.com). 


###### Core Control SubModules / Array Modules

A powerful feature of Core Control is submodules. By using submodules you can create models and surfaces that are organized as multiple modules using parent/child relationships. Array modules are a special type of module that lets you organize a set of submodules that are ordered and indexed. The CoolDAW module below is a an example of a module using submodules and array modules.


###### CoolDAW Module Example

To illustrate submodules and module arrays, consider a digital audio software application called "CoolDAW.' CoolDAW has an audio mixer with 1024 tracks, each having a volume and pan control, and a transport section with stop, play, and record controls.

The first module we will create is the top-level parent:
```
{
  type:'model',
  identifier:'cooldaw',
  name:'Cool DAW',
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
The next modules we create are a mixer module and an array module for the mixer's :
```
{
  type:'model',
  identifier:'mixer',
  name:'Mixer',
  tracks:[....]
}

```
And finally we create several track modules, one for each track:
```
{
  type:'model',
  identifier:'track',
  name:'Lead Vocals',
  controls: {
    'fader':{...},
    'pan':{...}
  }
}
```
All 1024 track modules are identical. But they are submodules of the array module which organizes them as an ordered, indexed set.

Here is a partial JSON representation of the Cool Daw module:

```
{
  type:'model',
  identifier:'cooldaw',
  name:'Cool DAW',
  transport:{
    identifier:'transport',
    name:'Transport',
    controls: {
      stop:{...},
      play:{...},
      record:{...},
    }
  },
  mixer:{
    identifier:'mixer',
    name:'Mixer',
    tracks:[
        {
          identifier:'track',
          name:'Track 1',
          controls: {
            'fader':{...},
            'pan':{...}
        },
        {
          identifier:'track',
          name:'Track 2',
          controls: {
            'fader':{...},
            'pan':{...}
        },
        ....
    ]
  }
}
```

Why organize modules using sub-modules and arrays? For one thing, it lets us write code that is object oriented, structured, modular and reusable. Another thing is that we can use JSON path and JSON patch standard technologies to reference data. A JSON path lets us refer to any property. For example: /mixer/tracks/4/track/controls/fader/valueNumber. It looks a lot like an OSC control address, right? Yes it does! Just like OSC we have readable paths for control addresses. Unlike OSC though, CC messages do not have to send the address as a long string in the message. A CC message can be very tiny so that fast realtime systems can operate with thousands of controls changing at the same time. Core Control translates CC paths and OSC addresses to provide backwards compatibility. In this example, the CC path '/mixer/tracks/4/track/controls/fader/valueNumber' maps to an OSC address '/mixer/tracks/4/track/fader' and floating point OSC value.


###### The Controls Object And Meters Object
The Core Control module schema has an object named "controls" and an object named "meters." The "controls" object contains control objects as key/value pairs where the key is the control name. This comes in really handy because we can construct JSON pointers that are simple and readable. Here are some example JSON pointers that point to key/value pairs in control objects:

```
/cooldaw/transport/controls/play/valueNumber
/cooldaw/tracks/0/track/controls/fader/valueString
```

The "meters" object is very similar.

#### Core Control APIs

Core Control provides a high-level API that can be seen in corecontrol.h.



