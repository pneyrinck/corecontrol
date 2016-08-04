/* ==============================================================================
 
 This file is part of the CoreControl library.
 Copyright (c) 2015 - Neyrinck LLC.
 
 Permission is granted to use this software under the terms of the GPL v2.
 Details of this licenses can be found at: www.gnu.org/licenses
 
 CoreControl is distributed in the hope that it will be useful, but WITHOUT ANY
 WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 
 To release a closed-source product which uses the CoreControl library, commercial
 licenses are available. Typically, a commercial license for a CoreControl Module
 is free. A CoreControl Module uses CoreControl only to be controllable by control
 surfaces or any other thing that uses CoreControl.
 
 Visit www.corecontrol.io/developer for more information.
 
 ==============================================================================*/
// copyright Neyrinck LLC 2016

const kCCModulePropertySet_Module =         "module"
const kCCModulePropertySet_Control =         "control"
const kCCModulePropertySet_Meter   =         "meter"
const kCCModulePropertySet_Preset  =         "preset"
const kCCModulePropertySet_Submodules  =   "submodules"
const kCCModulePropertySet_Custom  =         "custom"

const kCControlProperty_Id         =         "id"            // int value
const kCControlProperty_ParentId	=		"parentId"
const kCControlProperty_Identifier =         "identifier"    // stringValue
const kCControlProperty_GUID =         "guid"			// stringValue
const kCControlProperty_Type       =         "type"			// stringValue
const kCControlProperty_FeedbackType   =   "feedbackType"  // stringValue
const kCControlProperty_Name =         "name"			// stringValue
const kCControlProperty_Index =         "index"			// int value

const kCControlProperty_Vendor	=		"vendor"		// stringValue
const kCControlProperty_VendorType =         "vendorType"    // stringValue
const kCControlProperty_Label      =         "label"             // string
const kCControlProperty_NumberOfSteps  =   "numSteps"          // int
const kCControlProperty_DefaultValue   =   "default"           // string
const kCControlProperty_AutomationMode =   "auto"              // string
const kCControlProperty_ValueString   =    "valueString"       // string
const kCControlProperty_ValueNumber   =    "valueNumber"       // double
const kCControlProperty_MeterValue =         "meterVal"          // string
const kCControlProperty_ControlSuffix =    "controlSuffix"     // string
const kCControlProperty_MeterSuffix   =    "meterSuffix"       // string
const kCControlProperty_VendorSubType  =   "vendorSubType"     // string
const kCControlProperty_HostWindowID   =   "windowId"          // intValue
const kCControlProperty_HostWindowStatus=  "window"            // int
const kCControlProperty_BypassedState	=	"bypass"			// int
const kCControlProperty_ModifiedState   =  "modified"          // int
const kCControlProperty_NumberOfControls	="numControls"		// int
const kCControlProperty_NumberOfMeters=	"numMeters"         // int
const kCControlProperty_Enabled    =         "enabled"           // int
const kCControlProperty_NumberOfPresets=	"numPresets"		// int
const kCControlProperty_PresetName =         "presetName"        // string
const kCControlProperty_Preset     =         "preset"            // int
const kCControlProperty_Child      =         "child"             // string
const kCControlProperty_Parent     =         "parent"            // string
const kCControlProperty_TrackIndex =         "trackIndex"        // int
const kCCModuleProperty_InsertIndex     =  "insertIndex"       // int
const kCControlProperty_Category   =         "category"          // string
const kCControlProperty_Color      =         "color"             // string
const kCControlProperty_Path       =         "path"
const kCControlProperty_ReadablePath     = "readable_path"
const kCControlProperty_ClientId	=		"clientId"			// string or array of strings
const kCControlProperty_DisplayMode =		"displayMode"


const kCControlProperty_Icon		=		"icon"
const kCControlProperty_IconSet		=		"iconset"
const kCControlProperty_Images		=		"images"
const kCControlProperty_Size		=		"size"
const kCControlProperty_FileName	=		"filename"
const kCControlProperty_URL			=		"url"
const kCControlProperty_Pointer		=		"pointer"
const kCControlProperty_Help		=		"help"

const kCControlParameterTypeContinuous    ="continuous"        // values between 0.0 and 1.0
const kCControlParameterTypeIndexed      = "indexed"           // values of 0, 1, 2, ...
const kCControlParameterTypeBoolean      = "bool"              // values of 0 or 1
const kCControlParameterTypeDelta  =       "delta"             // increment or decrement such as scrub/shuttle
const kCControlParameterTypeMomentary    = "momentary"         // set to 1 to initiate an action, any other set value does nothing
const kCControlParameterTypeText   =         "text"
const kCControlParameterTypeTimeText  =		"timeText"
const kCControlParameterTypeBlob = "blob";
const kCControlParameterTypeObject = "object";

const kCCAppType_Application     =  "application"
const kCCAppType_Plugin     =         "plugin"

//                enum VControlMeterType {
const eControlControlMeterTypeAudio=0
const eControlControlMeterTypeGain=1

const cVControlPropertyType_NULL=0
const cVControlPropertyType_Number=1
const cVControlPropertyType_String=2
const cVControlPropertyType_Array= 3
const cVControlPropertyType_Blob=4

const kCControlCategory_AudioMixer   ="audiomixer"
const kCControlCategory_AudioStrip   ="audiostrip"
const kCControlCategory_Transport    ="transport"
const kCControlCategory_Editor       ="editor"
const kCControlCategory_Commands     ="commands"
const kCControlCategory_Globals      ="globals"
const kCControlCategory_Markers      ="markers"
const kCControlCategory_Keyboard      ="keyboard"
const kCControlCategory_Automation	 ="automation"
const kCControlCategory_StereoPanner ="stereopanner"
const kCControlCategory_SurroundPanner="surroundpanner"
const kCControlCategory_Monitor      ="monitor"
const kCControlProperty_Container    ="container"
const kCControlProperty_Array        ="array"

const kCControlCategory_AVWorkstation="avworkstation" //audio/video workstation
const kCControlCategory_Filter       ="filter"
const kCControlCategory_EQ           ="eq"
const kCControlCategory_EQParametric ="parametriceq"
const kCControlCategory_EQGraphic    ="graphiceq"
const kCControlCategory_Dynamics     ="dynamics"
const kCControlCategory_DynCompressor="compressor"
const kCControlCategory_DynExpander  ="expander"
const kCControlCategory_DynGate      ="gate"
const kCControlCategory_Reverb       ="reverb"
const kCControlCategory_Chorus       ="chorus"
const kCControlCategory_Flanger      ="flanger"
const kCControlCategory_Delay        ="delay"
const kCControlCategory_Pitch        ="pitch"
const kCControlCategory_Tone         ="tone" //amplifiers, pedals, warmth
const kCControlCategory_Distortion   ="distortion" //bitcrushers
const kCControlCategory_Generator    ="generator"
const kCControlCategory_Instrument   ="instrument"
const kCControlCategory_Mixer        ="mixer"
const kCControlCategory_Panner       ="panner"
const kCControlCategory_SoundField   ="soundfield"
const kCControlCategory_Color        ="color"
const kCControlCategory_PlugIn		   ="plugin"

const kCControlCategory_Phase ="phase"
const kCControlCategory_Trim  ="trim"

const kCControlCategory_Red="red"
const kCControlCategory_Green="green"
const kCControlCategory_Blue="blue"
const kCControlCategory_RGBA="0xhexvaluegoeshere" //32 bit rgba value in hex

const kCControlCategory_Track    ="track"
const kCControlCategory_Audio    ="audio"
const kCControlCategory_MIDI     ="midi"
const kCControlCategory_Aux      ="aux"
const kCControlCategory_Master   ="master"

const kCControlCategory_Send="send"
const kCControlCategory_Volume="volume"
const kCControlCategory_Mute  ="mute"
const kCControlCategory_Solo  ="solo"
const kCControlCategory_Record="record"
const kCControlCategory_InputMonitor  ="monitor"
const kCControlCategory_AutomationMode   ="automode"

const kCControlCategory_PanLeftRight ="panleftright"
const kCControlCategory_PanFrontBack ="panfrontback"
const kCControlCategory_PanBottomTop ="pantopbottom"
const kCControlCategory_PanFrontDivergence   ="divergencefront"
const kCControlCategory_PanRearDivergence    ="divergencerear"

//bus selects?		eVCCategory_Bus,

const kCControlCategory_SendVolume   ="sendvolume"
const kCControlCategory_SendMute     ="sendmute"
const kCControlCategory_SendPan      ="sendpan"
const kCControlCategory_SendPrePost  ="sendprepost"

const kCControlCategory_FilterBoostCut   ="boostcut"
const kCControlCategory_FilterFrequency  ="frequency"
const kCControlCategory_FilterQ          ="q"
const kCControlCategory_FilterBandwidth  ="bandwidth"
const kCControlCategory_FilterResonance  ="resonance"
const kCControlCategory_Threshold        ="threshold"
const kCControlCategory_Ratio            ="ratio"
const kCControlCategory_Depth            ="depth"
const kCControlCategory_DelayTime        ="delay"
const kCControlCategory_Feedback         ="feedback"
const kCControlCategory_Decay            ="decay"

const kCControlCategory_Modulation       ="modulation"
const kCControlCategory_Waveform         ="waveform"

const kCControlCategory_ChannelLeft  ="left"
const kCControlCategory_ChannelRight ="right"
const kCControlCategory_ChannelCenter="center"
const kCControlCategory_ChannelLFE   ="lfe"
const kCControlCategory_ChannelLs    ="leftsurround"
const kCControlCategory_ChannelRs    ="rightsurround"
const kCControlCategory_ChannelLss   ="leftsidesurround"
const kCControlCategory_ChannelRss   ="rightsidesurround"
const kCControlCategory_ChannelCs    ="centersurround"

const kCControlDisplayMode_Point	=	"point"
const kCControlDisplayMode_BoostCut	= "boostcut"
const kCControlDisplayMode_Wrap		= "wrap"
const kCControlDisplayMode_Spread	=	"spread"
const kCControlDisplayMode_Text		= "text"


const eControlControlNoMessageId = 0;
const eControlControlHostMessageId = 1;
const eControlControlModuleMessageId = 2;
const eControlControlHostMessageStringId = "host";
const eControlControlModuleMessageStringId = "module";

const eControlControlMessageModuleNone = 0;
const eControlControlMessageRequestModuleList = 10;
const eControlControlMessageModuleAdded = 11;
const eControlControlMessageModuleRemoved = 12;
const eControlControlMessageModulePatch = 13;
const eControlControlMessageModuleProperty = 14;

const eControlControlMessageModuleRequestAllControls = 20;
const eControlControlMessageModuleTouchControl = 21;
const eControlControlMessageModuleSetControl = 22;
const eControlControlMessageModuleSetControlText = 23;
const eControlControlMessageModuleSetControlDefault = 24;
const eControlControlMessageModuleUpdateControlTextSlice=25;
const eControlControlMessageModuleControlProperty=26;
const eControlControlMessageModuleControlBlob=27;


const eControlControlMessageHostInfo = 1;
const eControlControlMessageHostPing = 2;
const eControlControlMessageHostPong = 3;
const eControlControlMessageHostInfoString = "info";


var CORECONTROL = (function () {
    //  'use strict';
    // we need to have all constants generated by a build script to match vcsurfacemessage
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
        // Singleton
        // Private methods and variables
    	var self = this;
        var surfaces = [];
        var surface_id_counter = 0;
        var websocket;
        var node = new vcnode();

        node.addFilter(self);
        function publishSurface(surface)
        {
            surface.published = true;
            if (surface && surface.surfaceID) {
                var message = new CoreControlModuleMessage();
                message.type = eControlControlMessageModuleAdded;
                message.surfaceID = surface.surfaceID;
                message.textValue = surface.JSONDescriptor();
                node.send(message.packet());
            }
        }
        this.nodeDidConnect = function()
        {
    		message = new VControlHostMessage();
    		message.name = deviceName;
    		message.deviceType = deviceType;
    		node.send(message.packet());

            for (var i=0; i<surfaces.length; i++)
                publishSurface(surfaces[i]);
        };
        this.nodeDidDisconnect = function()
        {
        }
        this.filterNode = function(packet){
            if (isCoreControlModuleMessage(packet))
                handleMessageFromServer(packet);
            else if (isVControlHostMessage(packet))
                handleHostMessageFromServer(packet);
        }
        function handleMessageFromServer(packet)
        {
            var message = new CoreControlModuleMessage();
            message.initWithPacket(packet);
            if (message.surfaceID == 0) {
                console.log("moduleID should not be 0");
                return;
            }
            var surface = findSurfaceWithID(message.surfaceID);
            if (!surface){
                console.log("surface not found");
                return;
            }

            
            switch (message.type) {
                case eControlControlMessageModuleSetControl:
                    surface.updateControlValue(message.index, message.floatValue);
                    break;
                case eControlControlMessageModuleSetControlText:
    			case eControlControlMessageModuleUpdateControlTextSlice:
                    surface.updateControlValue(message.index, message.textValue);
                    break;
                case eControlControlMessageModuleProperty:
                    surface.setProperty(JSON.parse(message.textValue));
                    break;
    			case eControlControlMessageModuleControlProperty:
                    var keys = Object.keys(message.properties);
                    for (var i=0; i<keys.length; i++){
                        var key = keys[i];
                        var value = message.properties[key]; 
                        surface.setControlProperty(message.index, key, value);
                    }
                    
                    break;
                case eControlControlMessageModuleControlBlob:
                  surface.updateControlValue(message.index, message.dataValue);

                default:
                    break;
            }
        }
        function handleHostMessageFromServer(packet)
        {
            var message = new VControlHostMessage();
            message.initWithPacket(packet);
            switch (message.type) {
              case eControlControlMessageHostPing:
                  if (message.time > 0)
                  {
                      var responseMsg = new VControlHostMessage();
                      responseMsg.type = eControlControlMessageHostPong;
                      responseMsg.time = message.time;
                      node.send(responseMsg.packet());
                  }
                  break;
                default:
                    break;
            }
        }
        function findSurfaceWithID(surfaceID)
        {
            for (var i=0; i<surfaces.length; i++)
                if (surfaces[i].surfaceID == surfaceID)
                    return surfaces[i];
            return undefined;
        }
    	function vcnode(){
    		var self = this;
    		var connection;
    		var filters = [];
    		var handshake_received = false;
    		var hostName = "";
    		this.getHostName = function(){
    			return hostName;
    		}
    		this.setHost = function(host, path){
    			if (connection) connection.close();
    			if (!host){
    				hostName = "";
    				return;
    			}
    			hostName = host.name;
    			var ipaddress = host.local_address;
    			handshake_received = false;
    			var url = "ws://"+ipaddress;
    			if(!path) url += "/surfaces";
                    else url += path;
    			connection = new WebSocket(url);
    			connection.binaryType = "arraybuffer";
    			connection.onclose = onclose;
    			connection.onerror = onerror;
    			connection.onmessage = onmessage;
    			connection.onopen = onopen;
    		}
    		this.isConnected = function(){
    			return handshake_received;
    		}
    		function onopen(){
    			console.log('Connection opened');
    			var handshake_message = new Object();
    			handshake_message.type = "handshake";
    			handshake_message.version = "0.9.0";
    			handshake_message.id = "a1cbb19e-311f-4939-82e5-cbdb5be76094";
    			connection.send(JSON.stringify(handshake_message));
    		}
    		function onclose(){
                self.setHost(0)
    			if (!handshake_received) return;
    			for (var i=0; i<filters.length; i++){
    				filters[i].nodeDidDisconnect();
    			}
    			handshake_received = false;
                console.log('Connection closed');
    		}
    		function onerror(error){
    			console.log('WebSocket Error ' + JSON.stringify(error));
    		}
    		function versionTest(){
    			return true;
    		}
    		function onmessage(e){
    			if (typeof e.data === "string"){
    				var message = JSON.parse(e.data);
    				if (message["type"]&&message["version"]&&message["id"])
    					if (message["type"] == "handshake")
    						if (message["id"] == "a1cbb19e-311f-4939-82e5-cbdb5be76094")
    							if (versionTest()){
    								handshake_received = true;
    								for (var i=0; i<filters.length; i++){
    									filters[i].nodeDidConnect();
    								}
    							}
    				return;
    			}
    			if (!handshake_received) return;
    			var packet = new SVControlPacket();
    			packet.initWithArrayBuffer(e.data);
    			for (var i=0; i<filters.length; i++){
    				filters[i].filterNode(packet);
    			}

    			/*            var id = message.getUint16(0, true);
    			 var type = message.getUint16(2, true);
    			 var index = message.getUint16(4, true);
    			 var value = message.getFloat32(6, true); */
    		}
    		this.send = function(packet){
    			if (!handshake_received) return;
    			if (packet.binary > 0)
    				connection.send(packet.payload);
    			else if (packet.binary == 0)
    				connection.send(JSON.stringify(packet.payload));           
    		}
    		this.addFilter = function(filter){
    			filters.push(filter);
    		}
    	}
    	function VControlSurface(identifier, name, id, parent, isArray){
    		var type = "surface";
    		this.surfaceID = id;
    		var controls = [];
    		var meters = [];
    		var children = [];
    		var deviceName = "unnamed";
    		var deviceType = "";
    		var self = this;
    		// these functions have to be working before getSurfacePath is called
    		this.getIdentifier = function(){
    			return identifier;
    		}
    		this.getParent = function(){return parent;}
    		this.isArray = function(){
    			return isArray;
    		}
    		this.getName = function(){
    			return name;
    		}
    		var surface = new Object();
    		if (parent) parent.addChild(self);
    		surface[kCControlProperty_Type] = type;
    		surface[kCControlProperty_Id] = id;
    		surface[kCControlProperty_ParentId] = parent.surfaceID;
    		surface[kCControlProperty_Identifier] = identifier;
    		surface[kCControlProperty_Name] = name;
    		surface[kCControlProperty_Id] = id;
    		surface["controls"] = controls;
    		surface["meters"] = meters;
    		var path = getSurfacePath(this);
    		surface[kCControlProperty_Path] = path;
    		path = getReadableSurfacePath(this);
    		surface[kCControlProperty_ReadablePath] = path;

    		this.addControl = function(index, identifier, name, type){
    			var control = new Object();
    			control[kCControlProperty_Identifier] = identifier;
    			control[kCControlProperty_Name] = name;
    			control[kCControlProperty_Type] = type;
    			switch (type){
    				case kCControlParameterTypeText:
    				case kCControlParameterTypeTimeText:
                    case kCControlParameterTypeIndexed:
                    case kCControlParameterTypeBlob:
    					control[kCControlProperty_FeedbackType] = type;
    					control[kCControlProperty_NumberOfSteps] = 100;
    					break;
    				case kCControlParameterTypeIndexed:
    				case kCControlParameterTypeBoolean:
    					control[kCControlProperty_NumberOfSteps] = 2;
    					break;
    				default:
    					// assumes surface can display feedback with great accuracy
    					control[kCControlProperty_FeedbackType] = kCControlParameterTypeContinuous;
    					control[kCControlProperty_NumberOfSteps] = 100;
    					break;
    			}
    			controls.push(control);
    		}
    		this.addMeter = function(index, identifier, name){
    			var control = new Object();
    			control[kCControlProperty_Identifier] = identifier;
    			control[kCControlProperty_Name] = name;
    			meters.push(control);
    		}
    		this.addChild = function(child){
    			children.push(child);
    		}
    		this.getChildIndex = function(child){
    			return children.indexOf(child);
    		}
    		this.setPropertyValue = function(name, value){
    			surface[name] = value;
    		}
    		this.setControlValue = function(index, value){
    			var control = controls[index];
    			control["value"] = value;
    		}
    		this.getPropertyValue = function(name){
    			return surface[name];
    		}

    		this.updateControlProperty = function(index, key, value){
    			var control = controls[index];
    			if (!control) return;
    			control[key] = value;
    		}
    		this.getControlPropertyValue = function(index, key){
    			var control = controls[index];
    			if (!control) return "";
    			return control[key];
    		}
    		this.publish = function(){
    		}
    		this.updateControlValue = function(index, value){
    			var control = controls[index];
    			if (control && self.controlCallback){
    				self.controlCallback(self, index, control[kCControlProperty_Identifier], value);
    			}
    		}

    		this.setControlProperty = function(index, key, value){
    			var control = controls[index];
    			if (control && self.controlPropertyCallback){
                    control[key] = value;
                    self.controlPropertyCallback(self, index, control[kCControlProperty_Identifier], key, value);
    			}
    		}

    		this.setProperty = function(properties){
    			if (self.propertyCallback){
    				var keys = Object.keys(properties);
    				for (var i = 0; i < keys.length; i++) {
    					var val = properties[keys[i]];
    					self.propertyCallback(self, keys[i], val);
    				}
    			}
    		}
    		this.JSONDescriptor = function(){
    			return JSON.stringify(surface);
    		}
    		this.setControlCallback = function(callback){
    			self.controlCallback = callback;
    		};
    		this.setControlPropertyCallback = function(callback){
    			self.controlPropertyCallback = callback;
    		};
    		this.setPropertyCallback = function(callback){
    			self.propertyCallback = callback;
    		};

    		function getSurfacePath(module){
    			var path = module.getIdentifier();
    			var submodule = module;
    			var parent = submodule.getParent();
    			while (parent){
    				var index = -1;
    				var subpath = parent.getIdentifier();
    				if (parent && parent.isArray()){
    					index = parent.getChildIndex(submodule);
    					if (index >= 0){
    						subpath += "/";
    						subpath += index;
    					}
    				}
    				if (path.length > 0){
    					subpath += "/";
    					path = subpath + path;
    				}
    				submodule = parent;
    				parent = submodule.getParent();
    			}
    			return path;
    		}
    		function getReadableSurfacePath(module){
    			var path = module.getName();
    			var submodule = module;
    			var parent = submodule.getParent();
    			while (parent){
    				var index = -1;
    				var subpath = parent.getName();
    				if (parent && parent.isArray()){
    					index = parent.getChildIndex(submodule);
    					if (index >= 0){
    						subpath += "/";
    						subpath += index;
    					}
    				}
    				if (path.length > 0){
    					subpath += "/";
    					path = subpath + path;
    				}
    				submodule = parent;
    				parent = submodule.getParent();
    			}
    			return path;
    		}
    	}
        function isCoreControlModuleMessage(vcpacket){
            return vcpacket.id == eControlControlModuleMessageId;
        }
        function isVControlHostMessage(vcpacket){
            return vcpacket.id == eControlControlHostMessageId;
        }

        function CoreControlModuleMessage(){
            var self = this;
            this.surfaceID = 0;
            this.textValue;
            this.dataValue;
            this.type = eVCMessageId_None;
            this.floatValue = 0;
            this.index = 0;
            this.properties;
            this.packet = function(){
                var packet = new SVControlPacket();
                packet.id = eControlControlModuleMessageId;
                switch (this.type){
                    case eControlControlMessageModuleAdded:
                        var length = 3+this.textValue.length;
                        packet.payload = new ArrayBuffer(length);
                        var view = new DataView(packet.payload);
                        view.setUint8(0, packet.id, true);
                        view.setUint8(1, this.type, true);
                        view.setUint8(2, this.surfaceID, true);
                        for (var i=0; i<this.textValue.length; i++){
                            // danger, this does not handle unicode
                            view.setUint8(3+i, this.textValue.charCodeAt(i))
                        }
                       break;
                       case eControlControlMessageModuleSetControl:
                       case eControlControlMessageModuleTouchControl:
                           var length = 4+4;
                           packet.payload = new ArrayBuffer(length);
                           var view = new DataView(packet.payload);
                           view.setUint8(0, packet.id, true);
                           view.setUint8(1, self.type, true);
                           view.setUint8(2, self.surfaceID, true);
                           view.setUint8(3, self.index, true);
                           view.setFloat32(4, self.floatValue, true);
                           break;
                       case eControlControlMessageModuleSetControlText:
                           var length = 4+this.textValue.length;
                           packet.payload = new ArrayBuffer(length);
                           var view = new DataView(packet.payload);
                           view.setUint8(0, packet.id, true);
                           view.setUint8(1, self.type, true);
                           view.setUint8(2, self.surfaceID, true);
                           view.setUint8(3, self.index, true);
                           for (var i=0; i<this.textValue.length; i++){
                               // danger, this does not handle unicode
                               view.setUint8(4+i, this.textValue.charCodeAt(i))
                           }
                           break;
    				case eControlControlMessageModuleRequestAllControls:
                        var length = 3;
                        packet.payload = new ArrayBuffer(length);
                        var view = new DataView(packet.payload);
                        view.setUint8(0, packet.id, true);
                        view.setUint8(1, this.type, true);
                        view.setUint8(2, this.surfaceID, true);
                       break;
                    //////// NEW ADDED : TO REVIEW WITH PAUL
                    case eControlControlMessageModuleControlProperty:
                        
                        
                        var propString = JSON.stringify(this.properties);
                        var length = 4 + propString.length;
            
                        packet.payload = new ArrayBuffer(length);
                        var view = new DataView(packet.payload);
                        view.setUint8(0, packet.id, true);
                        view.setUint8(1, self.type, true);
                        view.setUint8(2, self.surfaceID, true);
                        view.setUint8(3, self.index, true);
            
                        // view.setUint8(3, self.index, true);
                       // console.log(JSON.stringify(self.properties));
                        // view.setUint8(4, JSON.stringify(self.properties), true);

                        for (var i=0; i<propString.length; i++){
                            view.setUint8(4+i, propString.charCodeAt(i), true);

                        }
                        break;
                    default:
                        break;
                 }
                return packet;
            }
            this.initWithPacket = function(vcpacket){
               
                if (!isCoreControlModuleMessage(vcpacket)) return;
                var dataview = new DataView(vcpacket.payload);
                self.type = dataview.getUint8(0, true);
                self.surfaceID = dataview.getUint8(1, true);
                switch (this.type){
                    case eControlControlMessageModuleSetControl:
                        self.index = dataview.getUint8(2, true);
                        self.floatValue = dataview.getFloat32(3, true);
                        break;
                        ////////
    				case eControlControlMessageModuleControlProperty:
                        self.index = dataview.getUint8(2, true);
                        self.properties = {};
                        var strings = "";
    					for (var i = 3; i < vcpacket.payload.byteLength; i++) {
                            strings += String.fromCharCode(dataview.getUint8(i));
                        }
                        self.properties = JSON.parse(strings);
                        break;
                    case eControlControlMessageModuleSetControlText:
                        self.index = dataview.getUint8(2, true);
                        self.textValue = "";
    					for (var i = 3; i < vcpacket.payload.byteLength; i++) {
                            self.textValue += String.fromCharCode(dataview.getUint8(i));
                        }
                        break;
                    case eControlControlMessageModuleProperty:
                        self.textValue = "";
    					for (var i = 2; i < vcpacket.payload.byteLength; i++) {
                            self.textValue += String.fromCharCode(dataview.getUint8(i));
                        }
                        break;
                    case eControlControlMessageModuleControlBlob:
                      self.index = dataview.getUint8(2, true);
                      self.dataValue = vcpacket.payload.slice(3);
                      break;
                    case eControlControlMessageModuleUpdateControlTextSlice:
                        self.index = dataview.getUint8(2, true);
              			self.sliceStart = dataview.getUint8(3, true);
                        self.textValue = "";
                        for (var i = 4; i < vcpacket.payload.byteLength; i++) {
                                  self.textValue += String.fromCharCode(dataview.getUint8(i));
                        }
              			break;
                    
                }
            }
        }
    	function VControlHostMessage() {
            var self = this;
    		var type;
    		var payload;
            this.time = 0;
    		this.name="unnamed";
            this.type;

    		this.initWithPacket = function(packet)
    		{
    			if (!isVControlHostMessage(packet)) return;
    			if (packet.binary > 0)
                {
                    var dataview = new DataView(packet.payload);
                    self.type = dataview.getUint8(0, true);
                    switch (this.type){
                      case eControlControlMessageHostPing:
                      case eControlControlMessageHostPong:
                            self.time = dataview.getFloat64(1, true);
                            break;
                    }
                    return;
                }
        		payload = packet.payload;
        		if (payload.type == "info")
        		{
        			type = eControlControlMessageHostInfo;
        			name = payload.name;
        		}
    	    }
    		this.packet = function(){
                var packet = new SVControlPacket();
                packet.id = eControlControlHostMessageId;
                if (this.type == eControlControlMessageHostPing ||
                    this.type == eControlControlMessageHostPong)
                {
                  packet.binary = 1;
                  var length = 10;
                  packet.payload = new ArrayBuffer(length);
                  var view = new DataView(packet.payload);
                  view.setUint8(0, packet.id, true);
                  view.setUint8(1, self.type, true);
                  view.setFloat64(2, self.time, true);
                }
                else {
                    packet.binary = 0;
                	message.id = eControlControlHostMessageStringId;
                	message.payload = {};
                    message.payload.type = eControlControlMessageHostInfoString;
                    message.payload.deviceType = this.deviceType;
                	message.payload.name = this.name;
                	packet.payload = message;
                }
    			return packet;
    		}
    	}
        const eVCMessageId_None = 0;
        function SVControlPacket(){
            var self = this;
            this.id = eControlControlNoMessageId;
            this.payload = 0;
            this.rawData = 0;
    		this.binary = 1;
            this.initWithArrayBuffer = function(arraybuffer){
                var dataview = new DataView(arraybuffer);
                this.id = dataview.getUint8(0, true);
                this.payload = arraybuffer.slice(1);
            }
            this.length = function(){
                return 2 + self.payload.byteLength;
            }
            this.data=function(){
                this.rawData = new ArrayBuffer(this.length());
                var dataView = DataView(this.rawData.data);
                dataView.setUint16(0, this.id, true);
                var payloadDataView = DataView(this.payload);
                for (var i=0; i<payloadDataView.byteLength; i++){
                    dataView.setUint8(2+i, payloadDataView.getUint8(i));
                }
                return this.rawData;
           }
        }

    	return {
          // Public methods and variables
    		SurfaceCreate: function(identifier, name, parent){
                surfaces.push(new VControlSurface(identifier, name, ++surface_id_counter, parent, false));
                return surfaces[surfaces.length - 1];
    		},
    		SurfaceArrayCreate: function(identifier, name, parent){
                surfaces.push(new VControlSurface(identifier, name, ++surface_id_counter, parent, true));
                return surfaces[surfaces.length - 1];
    		},
    		SurfaceDestroy: function(surface){
                if (surface.surfaceID != 0) {
                    var message = new CoreControlModuleMessage();
                    message.surfaceID = surface.surfaceID;
                    message.type = eControlControlMessageModuleRemoved;
                    node.send(message.packet());
                }
                var index = surfaces.indexOf(surface);
                surfaces.splice(index);
    		},
    		SurfaceSetControlCallback: function(surface, callback){
                surface.setControlCallback(callback);
    		},
    		SurfaceSetControlPropertyCallback: function(surface, callback){
                surface.setControlPropertyCallback(callback);
    		},
    		SurfaceSetPropertyCallback: function(surface, callback){
                surface.setPropertyCallback(callback);
    		},
    		SurfaceAddControl: function(surface, index, identifier, name, type){
                surface.addControl(index, identifier, name, type);
    		},
    		SurfaceAddMeter: function(surface, index, name, type){
                surface.addMeter(meterIndex, name, type);
    		},
    		SurfacePublish: function(surface){
                publishSurface(surface);
    		},
    		SurfaceSetControlValue: function(surface, index, value){
                surface.setControlValue(index, value);
                var message = new CoreControlModuleMessage();
                message.surfaceID = surface.surfaceID;
                message.index = index;
                switch (typeof value)
                {
                  case "string":
                    message.type = eControlControlMessageModuleSetControlText;
                    message.textValue = value;
                    break;
                  default:
                    message.type = eControlControlMessageModuleSetControl;
                    message.floatValue = value;
                    break;
                }
                node.send(message.packet());
    		},
            //////////////// ADDED NEW : TO REVIEW WITH PAUL
            SurfaceSetControlProperty: function(surface, index, key, value){

                surface.setControlProperty(index, key, value);
                var message = new CoreControlModuleMessage();
                message.surfaceID = surface.surfaceID;
                message.index = index;
                message.type = eControlControlMessageModuleControlProperty;
                if (!message.properties) message.properties = {};
                message.properties[key] = value; 
                node.send(message.packet());           
            },
    		SurfaceSetControlTouch: function(surface, index, value){
                var message = new CoreControlModuleMessage();
                message.surfaceID = surface.surfaceID;
                message.type = eControlControlMessageModuleTouchControl;
                message.index = index;
                message.floatValue = value;
                node.send(message.packet());
    		},
    		SurfaceUpdatePropertyValue: function(surface, name, value){
                surface.setPropertyValue(name, value);
    		},
    		SurfaceUpdateControlPropertyValue: function(surface, index, name, value){

                var control = controls[index];
                control[name] = value;
    		},
    		SurfaceUpdateMeterPropertyValue: function(surface, index, name, value){
                var meter = meters[index];
                meter[name] = value;
    		},
    		SurfaceGetPropertyValue: function(surface, name){
    			return surface.getPropertyValue(name);
    		},
    		SurfaceUpdateControlProperty: function(surface, index, key, value){
                return surface.updateControlProperty(index, key, value);
    		},
    		SurfaceGetControlPropertyValue: function(surface, index, key){
    			return surface.getControlPropertyValue(index, key);
    		},
    		SurfaceRequestAllControls: function(surface){
                var message = new CoreControlModuleMessage();
                message.surfaceID = surface.surfaceID;
                message.type = eControlControlMessageModuleRequestAllControls;
                node.send(message.packet());
    		},
    		DeviceSetName: function(name){
    			deviceName = name;
    		},

    		DeviceSetType: function(type){
    			deviceType = type;
    		},

    		FindHosts: function(callback){
                // request vcontrol pro websocket servers on this local network
                var xmlhttp=new XMLHttpRequest();
                xmlhttp.open("GET","https://api.neyrinck.com/service/find?type=_vcontrol-websocket._tcp",true);
                xmlhttp.onreadystatechange=findresponse;
                try {
                  xmlhttp.send();
                  } catch (e) {
                    console.log("send failed "+JSON.stringify(e));
                    if (callback) callback([])
                  }
                function findresponse(){
                    if (!callback) return;
                    if (xmlhttp.readyState==4)
                    {
                      if (xmlhttp.status == 200 && xmlhttp.status < 300)
                      {
                        var response
                        if (xmlhttp.responseText.substr(0,1) == '[')
                        {
                          response = JSON.parse(xmlhttp.responseText);
                          if (response){
                              callback(response);
                              return;
                          }
                        }
                      }
                      callback([])
                    }
                }
    		},
    		Connect: function(host, path){
                // uncomment for tunnel testing
                // host.local_address = "127.0.0.1:9020";
                node.setHost(host, path);
    		},
    		IsConnected: function(){
                return node.isConnected();
    		},
    		Disconnect: function(){
                node.setHost(0);
    		},
    		GetSurfaceServer: function(){
                return node.getHostName();
    		},
    		version: "0.9.0"	//http://semver.org/

        //module property set keys
        };

    };
    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {

          if ( !instance ) {
            instance = init();
          }

          return instance;
        }
    };

})();

var CC = (function(){

    var controlInfo = {};
    var modules = [];
    var corecontrol = CORECONTROL.getInstance();

    this.SubscribeFPtr = function(identifier, callback, param){

    }

    this.Unsubscribe = function(identifier, registeredUid){

    }

    this.ModuleCreate = function(type, identifier, name, parent, isArray){

    }

    this.ModuleDestroy = function(module){

    }

    this.RequestAllControls = function(module){
        for (var i=0; i<modules.length; i++)
                corecontrol.SurfaceRequestAllControls(modules[i].getModule());

    }

    this.SetProperty = function(path, key, value){

    }

    this.GetProperty= function(identifier, key, ccValue){

    }

    this.SetModuleProperty = function(module, key, value){

    }

    this.SetControlProperty = function(module, identifier, key, value){

    }

    this.SetMeterProperty = function(module, identifier, key, value){

    }

    this.AddControl = function(module, identifier, type){

    }

    this.GetModuleProperty = function(module, identifier, key, ccValue){

    }

    this.GetControlProperty = function(module, identifier, key, ccValue){

    }

    this.GetMeterProperty = function(module, identifier, key, ccValue){

    }

    this.TouchControl = function(identifier, value){
        var fullId = identifier;
        var ctlInfo = controlInfo[fullId];
        if (ctlInfo){
            corecontrol.SurfaceSetControlTouch(ctlInfo.module, ctlInfo.index, value);
        }

    }

    this.SetModuleVendor = function(module, vendor){

    }

    this.SetModuleCategory = function(module, category){

    }

    this.SetModuleIconUrl = function(module, url){

    }

    this.SetModuleHelpUrl = function(module, url){

    }

    this.SetModuleAutorelease = function(module, autorelease){

    }

    this.SetControl = function(){

    }

    this.SetSurfaceDeviceInfo = function(name, type){

    }

    this.Publish = function(mdoule){

    }

    this.Connect = function(mdoule, socket){

    }

    this.DestroyConnection = function(socket){

    } 

    this.GetModulePath = function(module){

    }

    this.SetMeter = function(module, identifier, value){

    }
    
})();
