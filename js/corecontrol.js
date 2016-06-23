const kVCModulePropertySet_Module =         "module"
const kVCModulePropertySet_Control =         "control"
const kVCModulePropertySet_Meter   =         "meter"
const kVCModulePropertySet_Preset  =         "preset"
const kVCModulePropertySet_Submodules  =   "submodules"
const kVCModulePropertySet_Custom  =         "custom"

const kVControlProperty_Id         =         "id"            // int value
const kVControlProperty_ParentId	=		"parentId"
const kVControlProperty_Identifier =         "identifier"    // stringValue
const kVControlProperty_GUID =         "guid"			// stringValue
const kVControlProperty_Type       =         "type"			// stringValue
const kVControlProperty_FeedbackType   =   "feedbackType"  // stringValue
const kVControlProperty_Name =         "name"			// stringValue
const kVControlProperty_Index =         "index"			// int value

const kVControlProperty_Vendor	=		"vendor"		// stringValue
const kVControlProperty_VendorType =         "vendorType"    // stringValue
const kVControlProperty_Label      =         "label"             // string
const kVControlProperty_NumberOfSteps  =   "numSteps"          // int
const kVControlProperty_DefaultValue   =   "default"           // string
const kVControlProperty_AutomationMode =   "auto"              // string
const kVControlProperty_ValueString   =    "valueString"       // string
const kVControlProperty_ValueNumber   =    "valueNumber"       // double
const kVControlProperty_MeterValue =         "meterVal"          // string
const kVControlProperty_ControlSuffix =    "controlSuffix"     // string
const kVControlProperty_MeterSuffix   =    "meterSuffix"       // string
const kVControlProperty_VendorSubType  =   "vendorSubType"     // string
const kVControlProperty_HostWindowID   =   "windowId"          // intValue
const kVControlProperty_HostWindowStatus=  "window"            // int
const kVControlProperty_BypassedState	=	"bypass"			// int
const kVControlProperty_ModifiedState   =  "modified"          // int
const kVControlProperty_NumberOfControls	="numControls"		// int
const kVControlProperty_NumberOfMeters=	"numMeters"         // int
const kVControlProperty_Enabled    =         "enabled"           // int
const kVControlProperty_NumberOfPresets=	"numPresets"		// int
const kVControlProperty_PresetName =         "presetName"        // string
const kVControlProperty_Preset     =         "preset"            // int
const kVControlProperty_Child      =         "child"             // string
const kVControlProperty_Parent     =         "parent"            // string
const kVControlProperty_TrackIndex =         "trackIndex"        // int
const kVCModuleProperty_InsertIndex     =  "insertIndex"       // int
const kVControlProperty_Category   =         "category"          // string
const kVControlProperty_Color      =         "color"             // string
const kVControlProperty_Path       =         "path"
const kVControlProperty_ReadablePath     = "readable_path"
const kVControlProperty_ClientId	=		"clientId"			// string or array of strings
const kVControlProperty_DisplayMode =		"displayMode"


const kVControlProperty_Icon		=		"icon"
const kVControlProperty_IconSet		=		"iconset"
const kVControlProperty_Images		=		"images"
const kVControlProperty_Size		=		"size"
const kVControlProperty_FileName	=		"filename"
const kVControlProperty_URL			=		"url"
const kVControlProperty_Pointer		=		"pointer"
const kVControlProperty_Help		=		"help"

const kVControlParameterTypeContinuous    ="continuous"        // values between 0.0 and 1.0
const kVControlParameterTypeIndexed      = "indexed"           // values of 0, 1, 2, ...
const kVControlParameterTypeBoolean      = "bool"              // values of 0 or 1
const kVControlParameterTypeDelta  =       "delta"             // increment or decrement such as scrub/shuttle
const kVControlParameterTypeMomentary    = "momentary"         // set to 1 to initiate an action, any other set value does nothing
const kVControlParameterTypeText   =         "text"
const kVControlParameterTypeTimeText  =		"timeText"
const kVControlParameterTypeBlob = "blob";
const kVControlParameterTypeObject = "object";

const kVCAppType_Application     =  "application"
const kVCAppType_Plugin     =         "plugin"

//                enum VControlMeterType {
const eVControlMeterTypeAudio=0
const eVControlMeterTypeGain=1

const cVControlPropertyType_NULL=0
const cVControlPropertyType_Number=1
const cVControlPropertyType_String=2
const cVControlPropertyType_Array= 3
const cVControlPropertyType_Blob=4

const kVControlCategory_AudioMixer   ="audiomixer"
const kVControlCategory_AudioStrip   ="audiostrip"
const kVControlCategory_Transport    ="transport"
const kVControlCategory_Editor       ="editor"
const kVControlCategory_Commands     ="commands"
const kVControlCategory_Globals      ="globals"
const kVControlCategory_Markers      ="markers"
const kVControlCategory_Keyboard      ="keyboard"
const kVControlCategory_Automation	 ="automation"
const kVControlCategory_StereoPanner ="stereopanner"
const kVControlCategory_SurroundPanner="surroundpanner"
const kVControlCategory_Monitor      ="monitor"
const kVControlProperty_Container    ="container"
const kVControlProperty_Array        ="array"

const kVControlCategory_AVWorkstation="avworkstation" //audio/video workstation
const kVControlCategory_Filter       ="filter"
const kVControlCategory_EQ           ="eq"
const kVControlCategory_EQParametric ="parametriceq"
const kVControlCategory_EQGraphic    ="graphiceq"
const kVControlCategory_Dynamics     ="dynamics"
const kVControlCategory_DynCompressor="compressor"
const kVControlCategory_DynExpander  ="expander"
const kVControlCategory_DynGate      ="gate"
const kVControlCategory_Reverb       ="reverb"
const kVControlCategory_Chorus       ="chorus"
const kVControlCategory_Flanger      ="flanger"
const kVControlCategory_Delay        ="delay"
const kVControlCategory_Pitch        ="pitch"
const kVControlCategory_Tone         ="tone" //amplifiers, pedals, warmth
const kVControlCategory_Distortion   ="distortion" //bitcrushers
const kVControlCategory_Generator    ="generator"
const kVControlCategory_Instrument   ="instrument"
const kVControlCategory_Mixer        ="mixer"
const kVControlCategory_Panner       ="panner"
const kVControlCategory_SoundField   ="soundfield"
const kVControlCategory_Color        ="color"
const kVControlCategory_PlugIn		   ="plugin"

const kVControlCategory_Phase ="phase"
const kVControlCategory_Trim  ="trim"

const kVControlCategory_Red="red"
const kVControlCategory_Green="green"
const kVControlCategory_Blue="blue"
const kVControlCategory_RGBA="0xhexvaluegoeshere" //32 bit rgba value in hex

const kVControlCategory_Track    ="track"
const kVControlCategory_Audio    ="audio"
const kVControlCategory_MIDI     ="midi"
const kVControlCategory_Aux      ="aux"
const kVControlCategory_Master   ="master"

const kVControlCategory_Send="send"
const kVControlCategory_Volume="volume"
const kVControlCategory_Mute  ="mute"
const kVControlCategory_Solo  ="solo"
const kVControlCategory_Record="record"
const kVControlCategory_InputMonitor  ="monitor"
const kVControlCategory_AutomationMode   ="automode"

const kVControlCategory_PanLeftRight ="panleftright"
const kVControlCategory_PanFrontBack ="panfrontback"
const kVControlCategory_PanBottomTop ="pantopbottom"
const kVControlCategory_PanFrontDivergence   ="divergencefront"
const kVControlCategory_PanRearDivergence    ="divergencerear"

//bus selects?		eVCCategory_Bus,

const kVControlCategory_SendVolume   ="sendvolume"
const kVControlCategory_SendMute     ="sendmute"
const kVControlCategory_SendPan      ="sendpan"
const kVControlCategory_SendPrePost  ="sendprepost"

const kVControlCategory_FilterBoostCut   ="boostcut"
const kVControlCategory_FilterFrequency  ="frequency"
const kVControlCategory_FilterQ          ="q"
const kVControlCategory_FilterBandwidth  ="bandwidth"
const kVControlCategory_FilterResonance  ="resonance"
const kVControlCategory_Threshold        ="threshold"
const kVControlCategory_Ratio            ="ratio"
const kVControlCategory_Depth            ="depth"
const kVControlCategory_DelayTime        ="delay"
const kVControlCategory_Feedback         ="feedback"
const kVControlCategory_Decay            ="decay"

const kVControlCategory_Modulation       ="modulation"
const kVControlCategory_Waveform         ="waveform"

const kVControlCategory_ChannelLeft  ="left"
const kVControlCategory_ChannelRight ="right"
const kVControlCategory_ChannelCenter="center"
const kVControlCategory_ChannelLFE   ="lfe"
const kVControlCategory_ChannelLs    ="leftsurround"
const kVControlCategory_ChannelRs    ="rightsurround"
const kVControlCategory_ChannelLss   ="leftsidesurround"
const kVControlCategory_ChannelRss   ="rightsidesurround"
const kVControlCategory_ChannelCs    ="centersurround"

const kVControlDisplayMode_Point	=	"point"
const kVControlDisplayMode_BoostCut	= "boostcut"
const kVControlDisplayMode_Wrap		= "wrap"
const kVControlDisplayMode_Spread	=	"spread"
const kVControlDisplayMode_Text		= "text"


const eVControlNoMessageId = 0;
const eVControlHostMessageId = 1;
const eVControlModuleMessageId = 2;
const eVControlHostMessageStringId = "host";
const eVControlModuleMessageStringId = "module";

const eVControlMessageModuleNone = 0;
const eVControlMessageRequestModuleList = 10;
const eVControlMessageModuleAdded = 11;
const eVControlMessageModuleRemoved = 12;
const eVControlMessageModulePatch = 13;
const eVControlMessageModuleProperty = 14;

const eVControlMessageModuleRequestAllControls = 20;
const eVControlMessageModuleTouchControl = 21;
const eVControlMessageModuleSetControl = 22;
const eVControlMessageModuleSetControlText = 23;
const eVControlMessageModuleSetControlDefault = 24;
const eVControlMessageModuleUpdateControlTextSlice=25;
const eVControlMessageModuleControlProperty=26;
const eVControlMessageModuleControlBlob=27;


const eVControlMessageHostInfo = 1;
const eVControlMessageHostPing = 2;
const eVControlMessageHostPong = 3;
const eVControlMessageHostInfoString = "info";



var VCONTROL = (function () {
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
                var message = new VControlModuleMessage();
                message.type = eVControlMessageModuleAdded;
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
            if (isVControlModuleMessage(packet))
                handleMessageFromServer(packet);
            else if (isVControlHostMessage(packet))
                handleHostMessageFromServer(packet);
        }
        function handleMessageFromServer(packet)
        {
            var message = new VControlModuleMessage();
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
                case eVControlMessageModuleSetControl:
                    surface.updateControlValue(message.index, message.floatValue);
                    break;
                case eVControlMessageModuleSetControlText:
				case eVControlMessageModuleUpdateControlTextSlice:
                    surface.updateControlValue(message.index, message.textValue);
                    break;
                case eVControlMessageModuleProperty:
                    surface.setProperty(JSON.parse(message.textValue));
                    break;
                case eVControlMessageModuleProperty:
                    surface.setProperty(JSON.parse(message.textValue));
                    break;
				case eVControlMessageModuleControlProperty:
                    surface.setControlProperty(message.index, JSON.parse(message.textValue));
                    break;
                case eVControlMessageModuleControlBlob:
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
              case eVControlMessageHostPing:
                  if (message.time > 0)
                  {
                      var responseMsg = new VControlHostMessage();
                      responseMsg.type = eVControlMessageHostPong;
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
			this.setHost = function(host){
				if (connection) connection.close();
				if (!host){
					hostName = "";
					return;
				}
				hostName = host.name;
				var ipaddress = host.local_address;
				handshake_received = false;
				var url = "ws://"+ipaddress;
				url += "/surfaces";
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
				console.log('WebSocket Error ' + error);
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
		surface[kVControlProperty_Type] = type;
		surface[kVControlProperty_Id] = id;
		surface[kVControlProperty_ParentId] = parent.surfaceID;
		surface[kVControlProperty_Identifier] = identifier;
		surface[kVControlProperty_Name] = name;
		surface[kVControlProperty_Id] = id;
		surface["controls"] = controls;
		surface["meters"] = meters;
		var path = getSurfacePath(this);
		surface[kVControlProperty_Path] = path;
		path = getReadableSurfacePath(this);
		surface[kVControlProperty_ReadablePath] = path;

		this.addControl = function(index, identifier, name, type){
			var control = new Object();
			control[kVControlProperty_Identifier] = identifier;
			control[kVControlProperty_Name] = name;
			control[kVControlProperty_Type] = type;
			switch (type){
				case kVControlParameterTypeText:
				case kVControlParameterTypeTimeText:
        case kVControlParameterTypeIndexed:
        case kVControlParameterTypeBlob:
					control[kVControlProperty_FeedbackType] = type;
					control[kVControlProperty_NumberOfSteps] = 100;
					break;
				case kVControlParameterTypeIndexed:
				case kVControlParameterTypeBoolean:
					control[kVControlProperty_NumberOfSteps] = 2;
					break;
				default:
					// assumes surface can display feedback with great accuracy
					control[kVControlProperty_FeedbackType] = kVControlParameterTypeContinuous;
					control[kVControlProperty_NumberOfSteps] = 100;
					break;
			}
			controls.push(control);
		}
		this.addMeter = function(index, identifier, name){
			var control = new Object();
			control[kVControlProperty_Identifier] = identifier;
			control[kVControlProperty_Name] = name;
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
		this.setControlPropertyValue = function(index, key, value){
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
				self.controlCallback(self, index, control[kVControlProperty_Identifier], value);
			}
		}
		this.setControlProperty = function(index, properties){
			var control = controls[index];
			if (control && self.controlPropertyCallback){
				var keys = Object.keys(properties);
				for (var i = 0; i < keys.length; i++) {
					var value = properties[keys[i]];
					control[keys[i]] = value;
					self.controlPropertyCallback(self, index, control[kVControlProperty_Identifier], keys[i], value);
				}
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
    function isVControlModuleMessage(vcpacket){
        return vcpacket.id == eVControlModuleMessageId;
    }
    function isVControlHostMessage(vcpacket){
        return vcpacket.id == eVControlHostMessageId;
    }

    function VControlModuleMessage(){
        var self = this;
        this.surfaceID = 0;
        this.textValue;
        this.dataValue;
        this.type = eVCMessageId_None;
        this.floatValue = 0;
        this.index = 0;
        this.packet = function(){
            var packet = new SVControlPacket();
            packet.id = eVControlModuleMessageId;
            switch (this.type){
                case eVControlMessageModuleAdded:
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
                   case eVControlMessageModuleSetControl:
                   case eVControlMessageModuleTouchControl:
                       var length = 4+4;
                       packet.payload = new ArrayBuffer(length);
                       var view = new DataView(packet.payload);
                       view.setUint8(0, packet.id, true);
                       view.setUint8(1, self.type, true);
                       view.setUint8(2, self.surfaceID, true);
                       view.setUint8(3, self.index, true);
                       view.setFloat32(4, self.floatValue, true);
                       break;
                   case eVControlMessageModuleSetControlText:
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
				case eVControlMessageModuleRequestAllControls:
                    var length = 3;
                    packet.payload = new ArrayBuffer(length);
                    var view = new DataView(packet.payload);
                    view.setUint8(0, packet.id, true);
                    view.setUint8(1, this.type, true);
                    view.setUint8(2, this.surfaceID, true);
                   break;
                default:
                    break;
             }
            return packet;
        }
        this.initWithPacket = function(vcpacket){
            if (!isVControlModuleMessage(vcpacket)) return;
            var dataview = new DataView(vcpacket.payload);
            self.type = dataview.getUint8(0, true);
            self.surfaceID = dataview.getUint8(1, true);
            switch (this.type){
                case eVControlMessageModuleSetControl:
                    self.index = dataview.getUint8(2, true);
                    self.floatValue = dataview.getFloat32(3, true);
                    break;
				        case eVControlMessageModuleControlProperty:
                    self.index = dataview.getUint8(2, true);
                    self.textValue = "";
					for (var i = 3; i < vcpacket.payload.byteLength; i++) {
                        self.textValue += String.fromCharCode(dataview.getUint8(i));
                    }
                    break;
                case eVControlMessageModuleSetControlText:
                    self.index = dataview.getUint8(2, true);
                    self.textValue = "";
					for (var i = 3; i < vcpacket.payload.byteLength; i++) {
                        self.textValue += String.fromCharCode(dataview.getUint8(i));
                    }
                    break;
                case eVControlMessageModuleProperty:
                    self.textValue = "";
					for (var i = 2; i < vcpacket.payload.byteLength; i++) {
                        self.textValue += String.fromCharCode(dataview.getUint8(i));
                    }
                    break;
                case eVControlMessageModuleControlBlob:
                  self.index = dataview.getUint8(2, true);
                  self.dataValue = vcpacket.payload.slice(3);
                  break;
                case eVControlMessageModuleUpdateControlTextSlice:
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
          case eVControlMessageHostPing:
          case eVControlMessageHostPong:
                self.time = dataview.getFloat64(1, true);
                break;
          }
          return;
      }
			payload = packet.payload;
			if (payload.type == "info")
			{
				type = eVControlMessageHostInfo;
				name = payload.name;
			}
		}
		this.packet = function(){
      var packet = new SVControlPacket();
      packet.id = eVControlHostMessageId;
      if (this.type == eVControlMessageHostPing ||
          this.type == eVControlMessageHostPong)
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
  			message.id = eVControlHostMessageStringId;
  			message.payload = {};
        message.payload.type = eVControlMessageHostInfoString;
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
        this.id = eVControlNoMessageId;
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
                var message = new VControlModuleMessage();
                message.surfaceID = surface.surfaceID;
                message.type = eVControlMessageModuleRemoved;
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
            var message = new VControlModuleMessage();
            message.surfaceID = surface.surfaceID;
            message.index = index;
            switch (typeof value)
            {
              case "string":
                message.type = eVControlMessageModuleSetControlText;
                message.textValue = value;
                break;
              default:
                message.type = eVControlMessageModuleSetControl;
                message.floatValue = value;
                break;
            }
            node.send(message.packet());
		},
		SurfaceSetControlTouch: function(surface, index, value){
            var message = new VControlModuleMessage();
            message.surfaceID = surface.surfaceID;
            message.type = eVControlMessageModuleTouchControl;
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
		SurfaceSetControlPropertyValue: function(surface, index, key, value){
			return surface.setControlPropertyValue(index, key, value);
		},
		SurfaceGetControlPropertyValue: function(surface, index, key){
			return surface.getControlPropertyValue(index, key);
		},
		SurfaceRequestAllControls: function(surface){
            var message = new VControlModuleMessage();
            message.surfaceID = surface.surfaceID;
            message.type = eVControlMessageModuleRequestAllControls;
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
		Connect: function(host, name, path){
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
