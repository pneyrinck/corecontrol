//
//  CCMeter.swift
//  Example
//
//  Created by Bernice Ling on 3/1/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

class CCMeter: UIView {
    var level: Float!
    var decaytolevel: Float!
    var peaklevel: Float!
    var clipped: Bool!
    var peakheight: Float!
    var clipheight: Float!
    var meterOn: CCButton!
    var meterOff: CCButton!
    var background: CCButton!
    var meterBox: CCButton!
    var meterMask: UIView!
    var clipBg: CCButton!
    var meter_off: UIImage!
    var meter_on: UIImage!
    var oldtime: UInt64!
    var lastMeterRxTime: UInt64!
    var lastUpdateTime: NSTimeInterval!
    var stateOn : CCButtonState!
    var stateOff : CCButtonState!
    var meterIsVertical : Bool!

    func setStates(onState: CCButtonState, offState: CCButtonState){
        stateOn = onState
        stateOff = offState
        self.setNeedsDisplay();
        self.updateSettings()
    }
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
        self.userInteractionEnabled = true
        level = 0.0
        decaytolevel = 0.0
        peaklevel = 0.0
        clipped = false
        peakheight = 1.0 / 12.0
        clipheight = 1.0 / 12.0
        self.updateSettings()
    }
    
    
    func updateSettings(){
        if meterMask != nil {
            meterMask.removeFromSuperview()
        }
        
        if meterOn != nil {
            meterOn.removeFromSuperview()
        }
        
        if meterOff != nil {
            meterOff.removeFromSuperview()
        }
        
        self.setNeedsDisplay();
        if (self.bounds.height > self.bounds.width){
            meterIsVertical = true
        } else {
            meterIsVertical = false
        }

        var backFrame: CGRect = self.frame
        backFrame.origin.x = 0
        backFrame.origin.y = 0
        meterOn = CCButton(frame: backFrame)
        meterOff = CCButton(frame: backFrame)
        meterMask = UIView(frame: backFrame)
        meterMask.clipsToBounds = true
        
        if (stateOn == nil){
            stateOn = CCButtonState()
        }
        if (stateOff == nil) {
            stateOff = CCButtonState()
        }
        meterOn.setState(stateOn, forIndex: 0)
        meterOn.setCurrentState(0)
        
        meterOff.setState(stateOff, forIndex: 0)
        meterOff.setCurrentState(0)
        
        if (meterIsVertical == true){
            self.addSubview(meterOn)
            meterMask.addSubview(meterOff)
        } else {
            self.addSubview(meterOff)
            meterMask.addSubview(meterOn)
        }
        self.addSubview(meterMask)
    }
    
   
    
    override func drawRect(rect: CGRect) {
        if level < 0.0 {
            level = 0.0
        }
        else if level > 1.0 {
            level = 1.0
        }
        
        var maskFrame: CGRect = meterMask.frame
        if (meterIsVertical == true){
            maskFrame.size.height = CGFloat(1.0 - level) * self.frame.size.height
        } else {
            maskFrame.size.width = CGFloat(level) * self.frame.size.width
        }
        
        meterMask.frame = maskFrame
        return
    }
    
    func value() -> Float {
        return level
    }
    
    func setValue(to: Float) {
        lastUpdateTime = NSDate.timeIntervalSinceReferenceDate()
        if to > level {
           let invalRect: CGRect = CGRectMake(0, CGFloat(self.bounds.size.height) * CGFloat(1 - to), self.bounds.size.width, CGFloat(self.bounds.size.height) * CGFloat(to - level))
            level = to
            decaytolevel = level
            self.setNeedsDisplayInRect(invalRect)
        }
        else if to < level {
            let invalRect: CGRect = CGRectMake(0, CGFloat(self.bounds.size.height) * CGFloat(1 - level), self.bounds.size.width, CGFloat(self.bounds.size.height) * CGFloat(level - to))
            level = to
            self.setNeedsDisplayInRect(invalRect)
        }
        
        lastMeterRxTime = oldtime
    }
    
    func setPeakValue(to: Float) {
        if peaklevel != to {
            peaklevel = to
            self.setNeedsDisplay()
        }
    }
    
    func setClipValue(tof: Float) {
        let to: Bool = (tof > 0.5)
        if clipped != to {
            clipped = to
            self.setNeedsDisplay()
        }
    }
    
    func lastUpdate() -> NSTimeInterval {
        return lastUpdateTime
    }
    
    let kMeterHoldIfNoDataTime: Float = 0.5
    // In seconds.  In MC, we should get a meter msg every 300ms (in theory...)
    let kMeterRelease: Float = 0.85
    //meters/sec
    let kMeterReleaseMC: Float = 1.0 / 1.8
    // decay rate is 1.8 seconds to go full range
    //#define PRINT_METER_DECAY_DEBUG_INFO 1
    
    func idle() {
        return
    }

}
