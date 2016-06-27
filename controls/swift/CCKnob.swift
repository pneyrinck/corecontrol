//
//  CCKnob.swift
//  Example
//
//  Created by Bernice Ling on 6/24/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

enum EEncoderMode: Int {
    case eEncoderDotMode = 0
    case eEncoderBoostCutMode = 1
    case eEncoderWrapMode = 2
    case eEncoderSpreadMode = 3
}


class CCKnob: UIControl {
    
    var knobData: [String : AnyObject?] =
        [
            "displayBackColor":  UIColor.blackColor(),
            "displayLightColor": UIColor.greenColor(),
            "circle1Color": UIColor(red: 0.56, green: 0.56, blue: 0.56, alpha: 1.0),
            "circle2Color": UIColor(red: 0.35, green: 0.35, blue: 0.35, alpha: 1.0),
            "circle1Radius": 0.78,
            "circle2Radius": 0.66,
            "backRadiusInner": 0.78,
            "backRadiusOuter": 0.96,
            "lightRadiusInner": 0.78,
            "lightRadiusOuter": 0.96
        ]
    

    var initPosition: Float = 0
    var position: Float = 0
    var lastpoint = CGPoint(x:0, y:0)
    var firsthandle: Bool?
    var lit: Bool = true
    var absoluteMode: Bool = false
    var isPanning: Bool?
    var isLinear: Bool?
    var startAngle: Float = 0
    var displayValue: UILabel?
    var displayName: UILabel?
    var numdots:Int = 11;
    var mode = EEncoderMode.eEncoderBoostCutMode.rawValue
    var rawposition: Float = 0
    var basePosition: Float = 0
    var numTicks:Int = 0
    
    override var enabled : Bool {
        didSet {
            setEnabled(enabled)
        }
    }
    
   
    
   
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)

//        setEnabled(true);
        self.backgroundColor = UIColor.clearColor()
        self.updateMagicNumbers()
        let recognizer: UIPanGestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(self.handlePan(_:)))
        self.addGestureRecognizer(recognizer)
    }
    
   @nonobjc
    func setEnabled(ienabled: Bool) {
        enabled = ienabled
        self.setNeedsDisplay()
    }
    
    @nonobjc
    func setMode(imode: Int){
        mode = imode
        self.setNeedsDisplay()
    }
    
    override func drawRect(rect: CGRect) {
        let ctx: CGContextRef = UIGraphicsGetCurrentContext()!
        
        // Drawing code
        CGContextSetRGBFillColor(ctx, 0, 0, 0, 1)
        
        var start: Float = 1.0
        var arcdistance: Float = 0.0
        var end: Float = 0.0
        let dotdistance: Float = 1.0 / Float(numdots)
        switch mode {
            case EEncoderMode.eEncoderDotMode.rawValue:
            //dot mode
            start = (1.0 - rawposition) * (Float(numdots) - 1.0) / (Float(numdots))
            arcdistance = 1.0 / (Float(numdots))
        case EEncoderMode.eEncoderBoostCutMode.rawValue:
            //boost cut mode
            if rawposition <= 0.5 {
                start = 0.5
                // - 0.5 / ((float)numdots);
                end = 1.0 - rawposition + 1.0 / (Float(numdots))
                if (end - start) < dotdistance {
                    start = end - dotdistance
                }
                arcdistance = end - start
            }
            else {
                end = 0.5
                // + 0.5 / ((float)numdots);
                start = 1.0 - rawposition
                if (end - start) < dotdistance {
                    end = start + dotdistance
                }
                arcdistance = end - start
            }
        case EEncoderMode.eEncoderWrapMode.rawValue:
            //wrap mode
            end = 1.0
            start = 1.0 - rawposition
            arcdistance = end - start
        case EEncoderMode.eEncoderSpreadMode.rawValue:
            //spread mode
            start = 0.5 - rawposition * 0.5
            end = 1.0 - start
            arcdistance = end - start
        default:
            break
        }

        
        if enabled == false {
            return
        }
        
        
        if rawposition >= 0.0 {
            print("rawpostion :\(rawposition)")
            let radiusinner = knobData["backRadiusInner"]as? Float
            let radiusouter = knobData["backRadiusOuter"] as? Float
            // draw inner circles-
            let outerRadius = rect.size.width * 0.5 * (1.0 - (knobData["circle1Radius"] as! CGFloat))
            let innerRadius = rect.size.width * 0.5 * (1.0 - (knobData["circle2Radius"] as! CGFloat))

 
            var smallerRectangle: CGRect = CGRectInset(rect, outerRadius, outerRadius)

            CGContextSetFillColorWithColor(ctx, (knobData["circle1Color"] as! UIColor).CGColor)
            CGContextFillEllipseInRect(ctx, smallerRectangle)
            smallerRectangle = CGRectInset(rect, innerRadius, innerRadius)
            CGContextSetFillColorWithColor(ctx, (knobData["circle2Color"] as! UIColor).CGColor)
            CGContextFillEllipseInRect(ctx, smallerRectangle)
      
            
            // **** TO DO : *****
            // strokeArc is a function from from C++ arcs.h/arcs.mm
            // need to find solution to import them or find alternatives
            //
            CGContextSetFillColorWithColor(ctx, (knobData["displayBackColor"] as! UIColor).CGColor)
            Arcs.StrokeArc(ctx, r: rect, startAngle: 45, arcAngle: 270, radius: radiusouter!, radius2: radiusinner!)
            CGContextSetFillColorWithColor(ctx, (knobData["displayLightColor"] as! UIColor).CGColor)
            Arcs.StrokeArc(ctx, r: rect, startAngle: 5+270 * Int32(start), arcAngle: 270*Int32(arcdistance), radius: radiusouter!, radius2: radiusinner!)
            Arcs.StrokeArc(ctx, r: rect, startAngle: 305, arcAngle:10, radius: radiusouter!, radius2: radiusinner!)

        }
        

    }
    
    func setValue(to: Double) {
        print("setValue");
        lit = (to > 0)
        self.setNeedsDisplay()
    }
    
    func getValue() -> Int {
        print("getValue");
        return numTicks
    }
    

    func updateMagicNumbers(){
        print("updateMagicNumbers")
        rawposition = position
    }

    
    func setEncoderValue(to: Float){
        print("setEncoderValue : \(to)")
        position = to
        self.updateMagicNumbers()
        self.setNeedsDisplay()
    }
    
    @nonobjc
    func setDisplayValue(to: String) {
        if (displayValue != nil){ displayValue!.text = to }
    }
    
    @nonobjc
    func setDisplayName(to: String) {
        if (displayName != nil){ displayName!.text = to }
    }
    
    func touchesBegan(touches: NSSet, event: UIEvent){
        print("touchesBegan")
        firsthandle = true
        if absoluteMode {
            var t: [AnyObject] = touches.allObjects
            let numTouches: Int = Int(t.count)
            if numTouches != 1 {
                return
            }
            let touch: UITouch = t[0] as! UITouch
            let translation: CGPoint = touch.locationInView(self)
            var x: Float
            var y: Float
            let ourSize: CGSize = self.frame.size
            x = Float(translation.x - ourSize.width / 2)
            y = Float(ourSize.height / 2 - translation.y)
            initPosition = self.XYToPosition(x, y: y)
            basePosition = rawposition
            lastpoint = translation
        }
    }
    
    func XYToPosition(x: Float, y: Float)->Float{
        var angle: Float = atan2(y, x)
        // from -pi to +pi relative to 3 oclock CCW
        if angle < 0 {
            // translate fom 0 to 2pi relative to 3 oclock CCW
            angle += 2 * 3.14
        }
        angle = (-angle) + 2 * 3.14
        //translate from 0 to 2pi relative to 3 oclock CW
        angle -= (0.5 * 3.14)
        //translate from 0 to 2pi relative to 6 oclock CW
        if angle < 0 {
            // translate fom 0 to 2pi relative to 6 oclock CW
            angle += 2 * 3.14
        }
        var val: Float = angle / 6.28
        // translate fom 0 to 1 relative to 6 oclock CW
        if val < 0.125 {
            val = 0.125
        }
        if val > 0.875 {
            val = 0.875
        }
        val = (val - 0.125) / 0.75
        if val > 1.0 {
            val = 1.0
        }
        return val
    }
    
    
    func touchesEnded(touches : NSSet, event : UIEvent){
         print("touchesEnded")
        isPanning = false
        self.setNeedsDisplay()
    }
    
    func sendKnobValue(val:Float){
        
    }
    
    func handlePan(recognizer: UIPanGestureRecognizer) {
        print("handlePan");
        var translation: CGPoint = recognizer.locationInView(self)
        var x: CGFloat
        var y: CGFloat
        var ourSize: CGSize = self.frame.size
        var center = CGPoint(x: 0, y: 0)
        center.x = ourSize.width / 2
        center.y = ourSize.height / 2
        x = translation.x - center.x
        y = translation.y - center.y
        if isnan(x) || isnan(y) {
            return
        }
        if absoluteMode {
            // touch
            if recognizer.state == .Began {
                self.sendActionsForControlEvents(.EditingDidBegin)
            }
            var newPosition: Float = basePosition + (self.XYToPosition(Float((translation.x) - ourSize.width) / 2, y: Float(ourSize.height / 2 - translation.y)) - initPosition) * 0.5
            if newPosition > 1.0 {
                newPosition = 1.0
            }
            if newPosition < 0.0 {
                newPosition = 0.0
            }
            self.sendKnobValue(newPosition)
            if recognizer.state == .Ended {
                self.sendActionsForControlEvents(.EditingDidEnd)
            }
            return
        }
        if (firsthandle != nil) {
            isPanning = true
            firsthandle = false
            lastpoint = translation
            let rad: Float = Float(x * x + y * y)
            if rad > 250 {
                isLinear = false
                startAngle = atan2(Float(y), Float(x))
            }
            else {
                isLinear = true
            }
        }
        else {
            numTicks = 0
            var angle: Float = 0
            if (isLinear != nil) {
                numTicks = Int((translation.x - lastpoint.x) + (translation.y - lastpoint.y) * 0.5)
                // top-right gain.
            }
            else {
                let goatseconstant: Float = 50.0
                angle = atan2(Float(y), Float(x))
                if angle * startAngle < 0 && fabs(angle - startAngle) > 3.141 {
                    if angle < 0 {
                        startAngle -= 3.14159 * 2
                    }
                    else {
                        startAngle += 3.14159 * 2
                    }
                }
                numTicks = Int((angle - startAngle) * goatseconstant)
            }
            if numTicks != 0 {
                print("numTicks \(numTicks)")
                self.sendActionsForControlEvents(.ValueChanged)
                lastpoint = translation
                startAngle = angle
            }
            
        }
    }
   
  
}

