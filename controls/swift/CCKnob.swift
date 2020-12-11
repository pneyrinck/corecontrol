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
    var position: Float = 0
    var lastpoint = CGPoint(x:0, y:0)
    var firsthandle: Bool?
    var lit: Bool = true
    var isPanning: Bool?
    var isLinear: Bool = false
    var startAngle: Float = 0
    var absoluteMode: Bool = false
    var displayValue: UILabel?
    var displayName: UILabel?
    var numdots:Int = 11;
    var mode = EEncoderMode.eEncoderDotMode.rawValue
    var centerLightOn: Bool = false
    var rawposition: Float = 0
    var basePosition: Float = 0
    var initPosition: Float = 0
    var numTicks:Int = 0
   
    
    override var isEnabled: Bool {
        didSet {
            print("did set ")
        }
    }
    
    var knobData: [String : AnyObject?] =
        [
            "displayBackColor":  UIColor.black,
            "displayLightColor": UIColor.green,
            "circle1Color": UIColor(red: 0.56, green: 0.56, blue: 0.56, alpha: 1.0),
            "circle2Color": UIColor(red: 0.35, green: 0.35, blue: 0.35, alpha: 1.0),
            "circle1Radius": 0.78 as AnyObject,
            "circle2Radius": 0.66 as AnyObject,
            "backRadiusInner": 0.78 as AnyObject,
            "backRadiusOuter": 0.96 as AnyObject,
            "lightRadiusInner": 0.78 as AnyObject,
            "lightRadiusOuter": 0.96 as AnyObject
        ]
    
   
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
        numdots = 11
        absoluteMode = false
        lit = true
        isEnabled = true
        
        self.backgroundColor = UIColor.clear
        position = 6.0 / 11.0
        updateMagicNumbers()
      
        let recognizer = UIPanGestureRecognizer(target: self, action:#selector(CCKnob.handlePan(_:)))
        self.addGestureRecognizer(recognizer)
    }
    
    @nonobjc
    func setEnabled(_ ienabled: Bool) {
        isEnabled = ienabled
        self.setNeedsDisplay()
    }
    
    @nonobjc
    func setMode(_ imode: Int){
        mode = imode
        self.setNeedsDisplay()
    }
    
    override func draw(_ rect: CGRect) {
        let ctx: CGContext = UIGraphicsGetCurrentContext()!
        
        // Drawing code
        ctx.setFillColor(red: 0, green: 0, blue: 0, alpha: 1)
        
        var start: Float = 1.0
        var arcdistance: Float = 0.0
        var end: Float = 0.0
        let dotdistance: Float = 1.0 / Float(numdots)
        switch mode {
            case EEncoderMode.eEncoderDotMode.rawValue:
            //dot mode
            start = (1.0 - rawposition) * (Float(numdots) - 1.0) / (Float(numdots))
            arcdistance = 1.0 / (Float(numdots))
            break
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
            break
        case EEncoderMode.eEncoderWrapMode.rawValue:
            //wrap mode
            end = 1.0
            start = 1.0 - rawposition
            arcdistance = end - start
            break
        case EEncoderMode.eEncoderSpreadMode.rawValue:
            //spread mode
            start = 0.5 - rawposition * 0.5
            end = 1.0 - start
            arcdistance = end - start
            break
        default:
            break
        }

        
        if isEnabled == false {
            return
        }
        
        
        if rawposition >= 0.0 || absoluteMode == true {
            let radiusinner = knobData["backRadiusInner"] as? CGFloat
            let radiusouter = knobData["backRadiusOuter"] as? CGFloat
            
            // draw inner circles-
            let outerRadius = rect.size.width * 0.5 * (1.0 - (knobData["circle1Radius"] as! CGFloat))
            let innerRadius = rect.size.width * 0.5 * (1.0 - (knobData["circle2Radius"] as! CGFloat))

 
            var smallerRectangle: CGRect = rect.insetBy(dx: outerRadius, dy: outerRadius)

            ctx.setFillColor((knobData["circle1Color"] as! UIColor).cgColor)
            ctx.fillEllipse(in: smallerRectangle)
            smallerRectangle = rect.insetBy(dx: innerRadius, dy: innerRadius)
            ctx.setFillColor((knobData["circle2Color"] as! UIColor).cgColor)
            ctx.fillEllipse(in: smallerRectangle)
      
            
            ctx.setFillColor((knobData["displayBackColor"] as! UIColor).cgColor)
            self.strokeArc(ctx, r: rect, startAngle: 45, arcAngle: 270, radius: Float(radiusouter!), radius2: Float(radiusinner!))
            ctx.setFillColor((knobData["displayLightColor"] as! UIColor).cgColor)
           
            
            
            self.strokeArc(ctx, r: rect, startAngle: Int(45+(270 * start)), arcAngle:Int(270*arcdistance), radius: Float(radiusouter!), radius2: Float(radiusinner!))

        }

    }
    
    
    func setValue(_ to: Float) {
        lit = (to > 0)
        self.setNeedsDisplay()
    }
    
    func getValue() -> Int {
        return numTicks
    }
    

    func updateMagicNumbers(){
        rawposition = position
    }

    
    func setEncoderValue(_ to: Float){
        position = to
        self.updateMagicNumbers()
        self.setNeedsDisplay()
    }
    
    @nonobjc
    func setDisplayValue(_ to: String) {
        if (displayValue != nil){ displayValue!.text = to }
    }
    
    @nonobjc
    func setDisplayName(_ to: String) {
        if (displayName != nil){ displayName!.text = to }
    }
    
    func touchesBegan(_ touches: NSSet, event: UIEvent){
        firsthandle = true
        if absoluteMode {
            var t: [AnyObject] = touches.allObjects as [AnyObject]
            let numTouches: Int = Int(t.count)
            if numTouches != 1 {
                return
            }
            let touch: UITouch = t[0] as! UITouch
            let translation: CGPoint = touch.location(in: self)
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
    
    func XYToPosition(_ x: Float, y: Float)->Float{
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
    
    
    func touchesEnded(_ touches : NSSet, event : UIEvent){
        isPanning = false
        self.setNeedsDisplay()
    }
    
    func sendKnobValue(_ val:Float){
        
    }
    
    @objc func handlePan(_ recognizer: UIPanGestureRecognizer) {
        let translation: CGPoint = recognizer.location(in: self)
        var x: CGFloat
        var y: CGFloat
        let ourSize: CGSize = self.frame.size
        let center = CGPoint(x: ourSize.width / 2, y: ourSize.height / 2)
        x = translation.x - center.x
        y = translation.y - center.y
        
        
        if x.isNaN || y.isNaN {
            return
        }
        
        
        if absoluteMode {

            // touch
            if recognizer.state == .began {
                
                self.sendActions(for: .editingDidBegin)
            }
            
            var newPosition: Float = basePosition + (self.XYToPosition(Float((translation.x) - ourSize.width/2), y: Float(ourSize.height / 2 - translation.y)) - initPosition) * 0.5
            if newPosition > 1.0 {
                newPosition = 1.0
            }
            if newPosition < 0.0 {
                newPosition = 0.0
            }
            self.sendKnobValue(newPosition)
            if recognizer.state == .ended {
                self.sendActions(for: .editingDidEnd)
            }
            return
        }
        if (firsthandle == true) {
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
            if (isLinear == true) {
                numTicks = Int(((translation.x - lastpoint.x) + (translation.y - lastpoint.y))*0.5)
                // top-right gain.
            }
            else {
                let goatseconstant: Float = 50.0
                angle = atan2(Float(y), Float(x))
                if (angle * startAngle < 0 && fabs(angle - startAngle) > 3.141 ){
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
                self.sendActions(for: .valueChanged)
                lastpoint = translation
                startAngle = angle
            }
           
            
        }
        
    }
    
    func strokeArc(_ context:CGContext, r:CGRect, startAngle:Int, arcAngle:Int, radius:Float, radius2:Float){
        // Signal the start of a path
        context.beginPath()
        // Set the start of the path to the arcs focal point
        context.move(to: CGPoint(x: r.origin.x + r.size.width / 2, y: r.origin.y + r.size.height / 2))
        var start: Float
        var end: Float
        var matrix: CGAffineTransform
        context.saveGState()
        // Save the context's state because we are going to scale it
        // Create a transform to scale the context so that a radius of 1 maps to the bounds
        // of the rectangle, and transform the origin of the context to the center of
        // the bounding rectangle.
        matrix = CGAffineTransform(a: r.size.width / 2, b: 0, c: 0, d: r.size.height / 2, tx: r.origin.x + r.size.width / 2, ty: r.origin.y + r.size.height / 2)
        context.concatenate(matrix)
        // Apply the transform to the context
        // Calculate the start and ending angles
        if arcAngle > 0 {
            start = Float(90 - startAngle - arcAngle) * Float.pi / 180
            end = Float(90 - startAngle) * Float.pi / 180
        }
        else {
            start = Float(90 - startAngle) * Float.pi / 180
            end = Float(90 - startAngle - arcAngle) * Float.pi / 180
        }
        // Add the Arc to the path
        context.addArc(center: CGPoint(x: 0, y: 0), radius: CGFloat(radius), startAngle: CGFloat(start), endAngle: CGFloat(end), clockwise: false)
        context.addArc(center: CGPoint(x: 0, y: 0), radius: CGFloat(radius2), startAngle: CGFloat(end), endAngle: CGFloat(start), clockwise: true)
        context.restoreGState()
        // Complete the path closing the arc at the focal point
        context.closePath()
        // Fill the path
        context.fillPath()

    }
   
  
}

