# corecontrol
### Control Almost Anything With Almost Anything

Copyright 2015, Neyrinck LLC

#### Quickstart

The CoreControl system connects things to be controlled by other things. For example, an audio mixer can be adjusted by a hardware control surface and/or a touch screen control surface. CoreControl uses the model-adapter-view pattern. A "data model" is remotely controlled by one or more "surfaces." An "adapter" translates between a model and surface. CoreControl uses modern, standards-based technologies such as JSON schema, JSON pointers, and web sockets.

###### Data Models

CoreControl lets a data model be controlled remotely. To connect a data model to CoreControl, just write some code like this C++ example:

```
#include "corecontrol.h"

// data model
bool MyWidgetDataModel::power = true;
float MyWidgetDataModel::volume = 0.7;
int MyWidgetDataModel::channel = 36;

// setup corecontrol
void MyWidgetDataModel::Setup()
{
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
Now MyWidgetDataModel has connected its controls to CoreControl and it can be controlled remotely. If any data model values are changed, the data model must call CCModuleSetValue(..) and CoreControl will broadcast those values to any remote controllers that are connected. CoreControl provides other powerful, optional features that you can read more about further down. These features include hierarchical models and surfaces, meters, metadata, discovery, and more.

###### Surfaces

CoreControl surfaces are user interfaces used to remotely control a data model. A surface exposes controls just like a data model does, but has a slightly different behavior. It sends value changes when a user adjusts a control. And when it receives changes to values from CoreControl, it updates the user interface to display the values. To connect a surface to CoreControl, just write some code like this C++ example:


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


