# corecontrol
### Control Almost Anything With Almost Anything

Copyright 2015, Neyrinck LLC

#### Quickstart

The CoreControl system connects things so one thing can be controlled by another thing. For example, an audio EQ software plug-in can be adjusted by a hardware control surface. CoreControl uses the model-adapter-view pattern. A "data model" is remotely controlled by a "surface." An "adapter" translates between the two. CoreControl uses modern, standards-based technologies such as JSON schema, JSON pointers, and web sockets.

###### Data Models

CoreControl lets a data model be controlled remotely. To connect a data model to CoreControl, just write some code like this C++ example:

```
#include "corecontrol.h"

void MyWidgetDataModel::Setup()

{
  CCModule* module = CCModuleCreate("model", "widgetx", "Widget X");
  CCModuleAddControl(module, "power", "boolean");
  CCModuleAddControl(module, "volume", "continuous");
  CCModuleAddControl(module, "channel", "discrete");
  CCModuleAddControlObserver(module, WidgetX::ReceiveControlValueNumber);
  CCModuleSetValue("power", true);
  CCModuleSetValue("volume", 0.7);
  CCModuleSetValue("channel", 36);
  CCModuleConnect(module);
}

void MyWidgetDataModel::ReceiveControlValueNumber(const char * controlName, float controlValue, void* context)
{
  if strcmp(controlName, "power")
  {
    // update your data model here
    // tell core control the new value
    CCModuleSetValue("power", controlValue > 0.5);
  }
  if strcmp(controlName, "volume")
  {
    // update your data model here
    // tell core control the new value
    CCModuleSetValue("volume", controlValue);
  }
  if strcmp(controlName, "channel")
  {
    // update your data model here
    // tell core control the new value
    CCModuleSetValue("channel", controlValue);
  }
}
```
Now MyWidgetDataModel has connected its controls to CoreControl and it can be controlled remotely. If any values are changed, the data model just calls CCModuleSetValue(..) and CoreControl will broadcast those values to any remote controllers that are connected. CoreControl provides other powerful, optional features that you can read more about further down. These features include hierarchical models, meters, and rich metadata.

###### Surfaces

CoreControl surfaces are user interfaces used to remotely control a data model. A surface exposes controls just like a data model does, but has a slightly different behavior. It sends out value changes when a user adjusts a control. And when it receives changes to values from CoreControl, it updates the user interface to display the values. To connect a surface to CoreControl, just write some code like this C++ example:

void MyCuteRemoteController::Setup()
{
  CCModule* module = CCModuleCreate("surface", "cuteremote", "Cute Remote");
  CCModuleAddControl(module, "knob", "delta");      // rotary encoder knob
  CCModuleAddControl(module, "up", "momentary");    // momentary push button
  CCModuleAddControl(module, "down", "momentary");  // momentary push button
  CCModuleAddControl(module, "display", "text");		// LCD text display
  CCModuleAddControlObserver(module, CuteRemote::ReceiveControlValueString);
  CCModuleConnect(module);
}

// this is called when the knob turns or a button is pushed
void MyCuteRemoteController::DoControlChange(const char* name, float value)
{
	CCModuleSetControlValueNumber(name, value);
}

void MyCuteRemoteController::ReceiveControlValueString(const char * controlName, std::string controlValue, void* context)
{
  if strcmp(controlName, "display")
  {
    // update the user interface here
  }
}

C++ Projects
To use CoreControl to your C++ project, add these files:
/includes/corecontrol.h
/module/corecontrol_interface.cpp
/module/corecontrol_library.c

Javascript Projects
/js/corecontrol.js


CoreControl is a sophisticated system with a simple API to expose data models and controllers and connect them together. It can be used for many useful things. For example, an audio workstation can expose its audio mixer data model, and a hardware surface with faders and knobs can remotely control it over a network connection. Or a coffee machine can expose its data model so that a phone can turn it on when you say "I want coffee." The possibilities are endless. 

CoreControl is programmed using the model-view-adapter pattern. The model and the view don't have any knowledge of each other. The adapter provides a mapping between them so that the view controls the adapter. In CoreControl, the model part is called a "model" and the view part is called a "surface." A surface can change the model and it can display the state of the data model.


