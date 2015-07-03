# corecontrol
Dead simple system to control almost anything with almost anything

CoreControl lets a data model be controlled remotely. To connect your data model to CoreControl, just write some code like this:

void WidgetX::Setup()
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

void WidgetX::ReceiveControlValueNumber(const char * controlName, float controlValue)
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

CoreControl lets a control surface expose its controls so it can control data models. To connect your surface to CoreControl, just write some code like this:

void CuteRemote::Setup()
{
CCModule* module = CCModuleCreate("surface", "cuteremote", "Cute Remote");
CCModuleAddControl(module, "knob", "delta");  //rotary encoder
CCModuleAddControl(module, "up", "momentary");  // push button
CCModuleAddControl(module, "down", "momentary");  // push button
CCModuleAddControl(module, "display", "text");
CCModuleAddControlObserver(module, CuteRemote::ReceiveControlValueString);
CCModuleSetValue("power", true);
CCModuleSetValue("volume", 0.7);
CCModuleSetValue("channel", 36);
CCModuleConnect(module);
}

void WidgetX::ReceiveControlValueNumber(const char * controlName, float controlValue)
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

Now the data model is exposed and can be remotely controlled.


To connect your model or surface to CoreControl

CoreControl is a sophisticated system with a simple API to expose data models and controllers and connect them together. It can be used for many useful things. For example, an audio workstation can expose its audio mixer data model, and a hardware surface with faders and knobs can remotely control it over a network connection. Or a coffee machine can expose its data model so that a phone can turn it on when you say "I want coffee." The possibilities are endless. 

CoreControl is programmed using the model-view-adapter pattern. The model and the view don't have any knowledge of each other. The adapter provides a mapping between them so that the view controls the adapter. In CoreControl, the model part is called a "model" and the view part is called a "surface." A surface can change the model and it can display the state of the data model.

CoreControl Modules

Models And Surface

