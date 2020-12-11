//
//  CCFader.swift
//  Example
//
//  Created by Bernice Ling on 2/26/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

struct CCTaperMark
{
	var name: String
	var position: Float
	
	init(name: String, position: Float) {
		self.name = name
		self.position = position
	}
   
};

@objcMembers
class CCFader: UIControl{

    var capButton: CCFaderCap!
    var groove: CCButton!
    var displayValue: UILabel!
    var logicBar: UIView!
    var capTouched: Bool!
    var position: Float!
    var hasLabelFontSize: Float!
    var hashLabelWidth: Float!
    var grooveTop: Float!
    var grooveBottom: Float!
    var grooveLeft: Float!
    var grooveRight: Float!
    var grooveHCenter: Float!
    var gutterBottom: Float!
    var gutterTop: Float!
    var gutterHeight: Float!
    var capVCenterOffset: Float!
    var recordMode: Bool!
    var faderIsVertical: Bool!
    var grooveWidth : Float?
    var highlightColor: UIColor
	{
    didSet {
		capButton.highlightColor = self.highlightColor;
		capButton.setNeedsDisplay();
    }
}
override var isHighlighted: Bool {
    didSet {
		capButton.isHighlighted = self.isHighlighted;
		capButton.setNeedsDisplay();
    }
}
	var capHeight:NSNumber = 78 {
        didSet {
            updateSettings()
        }
    }
	var faderCapState:CCButtonState!{
        didSet {
            if (capButton != nil)
            {
                capButton.setState(faderCapState, forIndex: 0)
            }
        }
    }
	var grooveState:CCButtonState!{
    didSet {
        if (groove != nil)
		{
			groove.setState(grooveState, forIndex: 0)
		}
    }
    }
	
    override init(frame: CGRect) {
		self.highlightColor = UIColor.clear
        super.init(frame: frame)
    }

    
    required init?(coder decoder: NSCoder) {
		self.highlightColor = UIColor.clear
        super.init(coder: decoder)
        capTouched = false
        position = 0
        hashLabelWidth = 22
        hasLabelFontSize = 12
        self.updateSettings()
    }
   
    override func layoutSubviews() {
        self.updateSettings()
    }
    

    
    func updateSettings() {
        
         let viewSize: CGSize = self.bounds.size

        let faderWasVertical = faderIsVertical
        
        // decide if fader should be displayed vertically or horizontally
        if (viewSize.height > viewSize.width) {
            faderIsVertical = true
        } else {
            faderIsVertical = false
        }
        
        if faderIsVertical != faderWasVertical {
            if capButton != nil {
                capButton.removeFromSuperview()
                capButton = nil
            }
            
            if groove != nil {
                groove.removeFromSuperview()
                groove = nil
            }
        }
        
        if faderIsVertical == true {
            drawVerticalFader(viewSize)
        } else {
            drawHorizontalFader(viewSize)
        }
    }
    
    func drawHorizontalFader(_ viewSize: CGSize){
        grooveLeft = Float(self.bounds.origin.x)
        grooveRight = Float(self.bounds.origin.x) + Float(viewSize.width)
    
        // draw cap

        let capRect: CGRect = CGRect(x: 0.0,y: 0.0,width: 44.0, height: self.frame.height)
        if capButton == nil {
            capButton = CCFaderCap(frame: capRect)
        } else {
            capButton.frame.size = capRect.size
        }
        
        if faderCapState != nil {
            capButton.setState(faderCapState, forIndex: 0)
        }
        capButton.layer.masksToBounds = false
        capButton.layer.shadowColor = UIColor.black.cgColor
        capButton.layer.shadowOpacity = 0.7
        capButton.layer.shadowRadius = 5
        capButton.layer.shadowOffset = CGSize(width: 0.0, height: 5.0)
        capButton.clipsToBounds = false
        capButton.gradientIsLeftToRight = true;
        
        // draw groove
        var h:CGFloat!
        if (grooveWidth != nil) {
             h = CGFloat(grooveWidth!)
        } else {
             h = CGFloat(6.0)
        }
        
        let y = self.frame.height/2 - h/2
        let w = viewSize.width - capRect.size.width
        let x = capRect.size.width / 2
        
        let grooveRect: CGRect = CGRect(x: x,y: y,width: w,height: h)
        if groove == nil {
            groove = CCButton(frame: grooveRect)
        } else {
            groove.frame = grooveRect
        }
        
        if groove.superview == nil {
            self.addSubview(groove)
        }
        if capButton.superview == nil {
            self.insertSubview(capButton, aboveSubview: groove)
        }
        
        self.setNeedsDisplay()

        self.updateCapPosition()
        
    }
    
    func drawVerticalFader(_ viewSize: CGSize){
        
        // we vertically stretch the groove pict to fit exactly inside the view height
        grooveTop = Float(self.bounds.origin.y)
        grooveBottom = Float(self.bounds.origin.y) + Float(viewSize.height)
        
        let capRect: CGRect = CGRect(x: 0.0,y: 0.0,width: self.bounds.width, height: CGFloat(capHeight))
        if capButton == nil {
            capButton = CCFaderCap(frame: capRect)
        } else {
            capButton.frame.size = capRect.size
        }
        
        if faderCapState != nil {
            capButton.setState(faderCapState, forIndex: 0)
        }
        capButton.layer.masksToBounds = false
        capButton.layer.shadowColor = UIColor.black.cgColor
        capButton.layer.shadowOpacity = 0.7
        capButton.layer.shadowRadius = 5
        capButton.layer.shadowOffset = CGSize(width: 0.0, height: 5.0)
        capButton.clipsToBounds = false
        
        var w:CGFloat!
        if (grooveWidth != nil) {
            w = CGFloat(grooveWidth!)
        } else {
            w = CGFloat(6.0)
        }

        
        let h = viewSize.height - capRect.size.height
        let y = capRect.size.height / 2
        let x = self.frame.width/2 - w/2
        
        let grooveRect: CGRect = CGRect(x: x,y: y,width: w,height: h)
        
        if groove == nil {
            groove = CCButton(frame: grooveRect)
        } else {
            groove.frame = grooveRect
        }
        
        if grooveState != nil {
            groove.setState(grooveState, forIndex: 0)
        }
        
        if groove.superview == nil {
            self.addSubview(groove)
        }
        if capButton.superview == nil {
            self.insertSubview(capButton, aboveSubview: groove)
        }
        
        self.setNeedsDisplay()
  
        // force redraw of labels and groove
        self.updateCapPosition()
    }
    
    func handleDoubleTap() {
        NotificationCenter.default.post(name: Foundation.Notification.Name(rawValue: "FaderViewDoubleTap"), object: self)
    }
    
    func updateCapPosition(){
        var animate: Bool?
        if capTouched == true {
            animate = false
        } else {
            animate = true
        }
        
        animate = true
                
        let capSize: CGSize = capButton.frame.size
  
        let w = capSize.width
        let h = capSize.height
        var x:CGFloat;
        var y:CGFloat
        if (faderIsVertical == true){
            x = 0.0;
            y = CGFloat(self.getYPosForFaderValue(position))
        } else {
            x = CGFloat(self.getXPosForFaderValue(position))
            y = 0.0
        }
      
        // what is the purpose of logicBarRect and logicBar?
        var logicBarRect: CGRect = CGRect(x: 0,y: 0,width: 0.0,height: 0.0)
        if logicBar != nil {
            logicBarRect = logicBar.frame
            x = x + CGFloat(hashLabelWidth)
        }
        
        let capRect: CGRect = CGRect(x: x,y: y,width: w,height: h)
        
        if (faderIsVertical == true){
            logicBarRect.origin.y = CGFloat(grooveTop) + (1 - CGFloat(position)) * (CGFloat(grooveBottom) - CGFloat(grooveTop))
            logicBarRect.size.height = CGFloat(position) * (CGFloat(grooveBottom) - CGFloat(grooveTop)) - 4
        }
        
        if (faderIsVertical == false){
            logicBarRect.origin.x = CGFloat(grooveLeft) + (1 - CGFloat(position)) * (CGFloat(grooveRight) - CGFloat(grooveLeft))
            logicBarRect.size.width = CGFloat(position) * (CGFloat(grooveRight) - CGFloat(grooveLeft)) - 4
        }
        
        
        
        if animate == true {
            UIView.beginAnimations(nil, context: nil)
            UIView.setAnimationDuration(0.09)
            UIView.setAnimationCurve(.easeInOut)
            UIView.setAnimationDelay(0.0)
        }
        capButton.frame = capRect
        
        if logicBar != nil {
            logicBar.frame = logicBarRect
        }
        if animate == true {
            UIView.commitAnimations()
        }
        
    }
    
    func getYPosForFaderValue(_ value: Float) -> Float {
        return ((1 - value) * (Float(self.bounds.size.height) - Float(capButton.frame.size.height)))
    }
    
    func getXPosForFaderValue(_ value: Float) -> Float {
        return (value * (Float(self.bounds.size.width) - Float(capButton.frame.size.width)))
    }
    
    
    
    func setPosition(_ to: Float) {
        if !capTouched {
            position = to
            self.updateCapPosition()
        }
    }
    
    func getChannelIndex() -> Int {
        return 0
    }
    
    func getYPosForScaleValue(_ value: Float) -> Float {
        return Float(self.getYPosForFaderValue(value)) + Float(capButton.frame.size.height) / 2
    }
    
    func getFaderValueForYPos(_ yPos: Float) -> Float {
        let capSize: CGSize = capButton.frame.size
        let viewSize: CGSize = self.bounds.size
        let value: Float = 1.0 - ((yPos) / (Float(viewSize.height) - Float(capSize.height)))
        return value
    }
	    func setValue(_ to: Float) {
        if (capTouched == true){
            position = to
            self.updateCapPosition()
        }
    }
    
    func setTouchValue(_ to: Float) {
        if (capTouched != false) {
            position = to
            self.updateCapPosition()
            self.sendActions(for: .valueChanged)
        }
    }
    
    func setTouchDelta(_ deltapx: Float) {
        if (capTouched != false) {
            var delta: Float;
            if (faderIsVertical == true){
                delta = deltapx / (Float(self.bounds.size.height) - Float(capButton.frame.size.height))
            } else {
                delta = deltapx / (Float(self.bounds.size.width) - Float(capButton.frame.size.width))
            }
            let p = position
            position = p! - delta;
            position = (position < 0) ? 0 : position
            position = (position > 1.0) ? 1.0 : position
            self.updateCapPosition()
            self.sendActions(for: .valueChanged)
        }
    }
    
    func getPosition() -> Float {
        return position
    }
	func getCapHeight() -> Float {
		return Float(capButton.frame.size.height)
	}
    
    func getCapWidth() -> Float {
        return Float(capButton.frame.size.width)
    }
    
    func getFaderWidth() -> Float {
        return Float(self.bounds.size.width)
    }
    
    func getFaderHeight() -> Float {
        return Float(self.bounds.size.height)
    }
	func setCapTouched(isTouched:Bool)
	{
		if capTouched==isTouched
		{
			return;
		}
		capTouched = isTouched;
		if (capTouched == true)
		{
			self.sendActions(for: .editingDidBegin)
		}
		else
		{
			self.sendActions(for: .editingDidEnd)
		}
	}
}
