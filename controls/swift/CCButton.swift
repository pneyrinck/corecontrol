//
//  CCButton.swift
//  Example
//
//  Created by Bernice Ling on 3/4/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

func degToRad (deg:CGFloat) -> CGFloat{
    return deg / 180.0 * CGFloat(M_PI)
}

class CCButton: UIButton {
    var buttonStates: NSMutableDictionary!
    var currentState: Int!
    var originalColor: UIColor!
    var originalFont: UIFont!
    var gradientIsLeftToRight: Bool = false
    var highlightColor: UIColor = UIColor.redColor();

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setup()
    }
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
        self.setup()
    }
    
    
    func setup(){
        buttonStates = NSMutableDictionary()
        originalColor = self.titleColorForState(.Normal)
        originalFont = self.titleLabel!.font
        self.setState(CCButtonState.grayButton(), forIndex: 0)
        self.currentState = 0
    }
    
    func setIcon(icon: FontAwesome){
        let sz: CGFloat = self.titleLabel!.font.pointSize
        originalFont = UIFont.fontAwesomeOfSize(sz)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .Center
        self.setTitle(String.fontAwesomeIconWithName(icon), forState: .Normal)
    }
    
    func setIcon(icon: FontAwesome, withSize size: CGFloat){
        originalFont = UIFont.fontAwesomeOfSize(size)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .Center
        self.setTitle(String.fontAwesomeIconWithName(icon), forState: .Normal)
    }
    
    func setIcon(fa_string : String){
        let sz: CGFloat = self.titleLabel!.font.pointSize
        originalFont = UIFont.fontAwesomeOfSize(sz)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .Center
        self.setTitle(String.fontAwesomeIconWithCode(fa_string), forState: .Normal)
    }
    
    func setIcon(fa_string : String, withSize size:CGFloat){
        originalFont = UIFont.fontAwesomeOfSize(size)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .Center
        self.setTitle(String.fontAwesomeIconWithCode(fa_string), forState: .Normal)
    }

    
    func setTwoIcons(icon:String, second icon2: String, withSize sz:CGFloat){
        originalFont = UIFont.fontAwesomeOfSize(sz)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .Center
        let i1 = String.fontAwesomeIconWithCode(icon)
        let i2 = String.fontAwesomeIconWithCode(icon2)
        self.setTitle("\(i1) \(i2)", forState: .Normal)
    }

    func setState(state: CCButtonState, forIndex index: Int) {
        buttonStates[Int(index)] = state
    }
    
    func stateForIndex(index: Int) -> CCButtonState {
        if let res: CCButtonState = buttonStates[Int(index)] as? CCButtonState {
            return res
        } else {
            return buttonStates[Int(0)] as! CCButtonState
        }
    }
    
    func createBorderPath(rc: CGRect, niftyState state: CCButtonState) -> CGPathRef {
        let p: CGMutablePathRef = CGPathCreateMutable()
        let x: CGFloat = rc.origin.x
        let y: CGFloat = rc.origin.y
        let w: CGFloat = rc.size.width
        let h: CGFloat = rc.size.height
        let borderRadiusTR: CGFloat = min(CGFloat(state.borderRadiusTR), min(w, h) / 2.0)
        let borderRadiusTL: CGFloat = min(CGFloat(state.borderRadiusTL), min(w, h) / 2.0)
        let borderRadiusBR: CGFloat = min(CGFloat(state.borderRadiusBR), min(w, h) / 2.0)
        let borderRadiusBL: CGFloat = min(CGFloat(state.borderRadiusBL), min(w, h) / 2.0)
        
        CGPathMoveToPoint(p, nil, x + borderRadiusTL, y) // top line start
        CGPathAddLineToPoint(p, nil, x + w - borderRadiusTR, y) // top line end
        CGPathAddArc(p, nil, x + w - borderRadiusTR, y + borderRadiusTR, borderRadiusTR, degToRad(270), degToRad(0), false)
        CGPathAddLineToPoint(p, nil, x + w, y + h - borderRadiusBR) // right line end
        CGPathAddArc(p, nil, x + w - borderRadiusBR, y + h - borderRadiusBR, borderRadiusBR, degToRad(0), degToRad(90), false)
        CGPathAddLineToPoint(p, nil, x + borderRadiusBL, y + h) // bottom line end
        CGPathAddArc(p, nil, x + borderRadiusBL, y + h - borderRadiusBL, borderRadiusBL, degToRad(90), degToRad(180), false)
        CGPathAddLineToPoint(p, nil, x, y + borderRadiusTL) // left line end
        CGPathAddArc(p, nil, x + borderRadiusTL, y + borderRadiusTL, borderRadiusTL, degToRad(180), degToRad(270), false)
        CGPathCloseSubpath(p)
        return p
    }
    
    override func drawRect(rect: CGRect) {
        
        let state: CCButtonState = self.stateForIndex(currentState)
        let ctx: CGContextRef = UIGraphicsGetCurrentContext()!
        let buttonArea: CGRect = CGRectInset(self.bounds, CGFloat(state.borderWidth) / 2.0, CGFloat(state.borderWidth) / 2.0)
        var borderPath: CGPathRef
        
        if state.equalBorderRadius() {
            let radius: CGFloat = min(CGFloat(state.borderRadiusTL), min(buttonArea.size.width, buttonArea.size.height) / 2.0)
            borderPath = CGPathCreateWithRoundedRect(buttonArea, radius, radius, nil)
        }
        else {
            borderPath = self.createBorderPath(buttonArea, niftyState: state)
        }
        
        // Draw background
        if (state.backgroundGradient != nil) {
            CGContextSaveGState(ctx)
                      
            let gradient: CGGradientRef = state.backgroundGradient.CGGradient()
            
            CGContextAddPath(ctx, borderPath)
            CGContextClip(ctx)
            var startPoint: CGPoint!
            var endPoint: CGPoint!
            
            if ( gradientIsLeftToRight == true){
                startPoint = CGPointMake(0, self.bounds.height)
                endPoint = CGPointMake(self.bounds.width, self.bounds.height)
            } else {
                startPoint = CGPointMake(CGRectGetMidX(buttonArea), CGRectGetMinY(buttonArea))
                endPoint = CGPointMake(CGRectGetMidX(buttonArea), CGRectGetMaxY(buttonArea))
            }
            
            CGContextDrawLinearGradient(ctx, gradient, startPoint, endPoint, CGGradientDrawingOptions(rawValue: 0))
            CGContextRestoreGState(ctx)
        }
        else if (state.backgroundColor != nil) {
            CGContextAddPath(ctx, borderPath)
            CGContextSetFillColorWithColor(ctx, state.backgroundColor.CGColor)
            CGContextFillPath(ctx)
        }
		
		// highlight coloring useful for Pro Tools automation modes
		if (self.highlighted)
		{
			CGContextAddPath(ctx, borderPath)
			CGContextSetFillColorWithColor(ctx, highlightColor.colorWithAlphaComponent(0.3).CGColor)
			CGContextFillPath(ctx)
		}
		
        // Draw border
        if (state.borderWidth > 0) {
            CGContextAddPath(ctx, borderPath)
            CGContextSetStrokeColorWithColor(ctx, state.borderColor.CGColor)
            CGContextSetLineWidth(ctx, CGFloat(state.borderWidth))
            CGContextDrawPath(ctx, .Stroke)
        }
        
    }
    
    func getCurrentState() -> Int {
        return currentState
    }
    
    func setCurrentState(newState: Int) {
        currentState = newState
        self.setNeedsDisplay()
        let state: CCButtonState = self.stateForIndex(currentState)
        // set color
        if (state.textColor != nil) {
            self.setTitleColor(state.textColor, forState: .Normal)
        }
        else {
            self.setTitleColor(originalColor, forState: .Normal)
        }
        // set font
        if (state.textFont != nil) {
            self.titleLabel!.font = state.textFont
        }
        else if originalFont != nil {
            self.titleLabel!.font = originalFont
        }
        
    }
    
    func setText(text: String) {
        self.setTitle(text, forState: .Normal)
    }

}
