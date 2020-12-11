//
//  CCButton.swift
//  Example
//
//  Created by Bernice Ling on 3/4/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit
// FIXME: comparison operators with optionals were removed from the Swift Standard Libary.
// Consider refactoring the code to use the non-optional operators.
fileprivate func < <T : Comparable>(lhs: T?, rhs: T?) -> Bool {
  switch (lhs, rhs) {
  case let (l?, r?):
    return l < r
  case (nil, _?):
    return true
  default:
    return false
  }
}

// FIXME: comparison operators with optionals were removed from the Swift Standard Libary.
// Consider refactoring the code to use the non-optional operators.
fileprivate func > <T : Comparable>(lhs: T?, rhs: T?) -> Bool {
  switch (lhs, rhs) {
  case let (l?, r?):
    return l > r
  default:
    return rhs < lhs
  }
}


func degToRad (_ deg:CGFloat) -> CGFloat{
    return deg / 180.0 * .pi
}

class CCButton: UIButton {
    var buttonStates: NSMutableDictionary!
    var currentState: Int!
    var originalColor: UIColor!
    var originalFont: UIFont!
    var gradientIsLeftToRight: Bool = false
    var highlightColor: UIColor = UIColor.red;
	var unused: Bool = false
	{
		didSet {
			self.setNeedsDisplay();
		}
	}

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
        originalColor = self.titleColor(for: UIControl.State())
        originalFont = self.titleLabel!.font
        self.setState(CCButtonState.grayButton(), forIndex: 0)
        self.currentState = 0
    }
    
    func setIcon(_ icon: FontAwesome){
        let sz: CGFloat = self.titleLabel!.font.pointSize
        originalFont = UIFont.fontAwesomeOfSize(sz)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .center
        self.setTitle(String.fontAwesomeIconWithName(icon), for: UIControl.State())
    }
    
    func setIcon(_ icon: FontAwesome, withSize size: CGFloat){
        originalFont = UIFont.fontAwesomeOfSize(size)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .center
        self.setTitle(String.fontAwesomeIconWithName(icon), for: UIControl.State())
    }
    
    func setIcon(_ fa_string : String){
        let sz: CGFloat = self.titleLabel!.font.pointSize
        originalFont = UIFont.fontAwesomeOfSize(sz)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .center
        self.setTitle(String.fontAwesomeIconWithCode(fa_string), for: UIControl.State())
    }
    
    func setIcon(_ fa_string : String, withSize size:CGFloat){
        originalFont = UIFont.fontAwesomeOfSize(size)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .center
        self.setTitle(String.fontAwesomeIconWithCode(fa_string), for: UIControl.State())
    }

    
    func setTwoIcons(_ icon:String, second icon2: String, withSize sz:CGFloat){
        originalFont = UIFont.fontAwesomeOfSize(sz)
        self.titleLabel!.font = originalFont
        self.titleLabel!.textAlignment = .center
        let i1 = String.fontAwesomeIconWithCode(icon)
        let i2 = String.fontAwesomeIconWithCode(icon2)
        
        if i1 != nil && i2 != nil {
            self.setTitle("\(i1!) \(i2!)", for: UIControl.State())
        }
    }

    func setState(_ state: CCButtonState, forIndex index: Int) {
        buttonStates[Int(index)] = CCButtonState(state)
    }
    
    func stateForIndex(_ index: Int) -> CCButtonState {
        if let res: CCButtonState = buttonStates[Int(index)] as? CCButtonState {
            return res
        } else {
            return buttonStates[Int(0)] as! CCButtonState
        }
    }
    
    func createBorderPath(_ rc: CGRect, niftyState state: CCButtonState) -> CGPath {
        let p: CGMutablePath = CGMutablePath()
        let x: CGFloat = rc.origin.x
        let y: CGFloat = rc.origin.y
        let w: CGFloat = rc.size.width
        let h: CGFloat = rc.size.height
        let borderRadiusTR: CGFloat = min(CGFloat(state.borderRadiusTR), min(w, h) / 2.0)
        let borderRadiusTL: CGFloat = min(CGFloat(state.borderRadiusTL), min(w, h) / 2.0)
        let borderRadiusBR: CGFloat = min(CGFloat(state.borderRadiusBR), min(w, h) / 2.0)
        let borderRadiusBL: CGFloat = min(CGFloat(state.borderRadiusBL), min(w, h) / 2.0)
        
        p.move(to: CGPoint (x: x + borderRadiusTL, y: y)) // top line start
        p.addLine(to: CGPoint (x:  x + w - borderRadiusTR, y: y)) // top line end
        p.addArc(center: CGPoint(x: x + w - borderRadiusTR, y: y + borderRadiusTR), radius: borderRadiusTR, startAngle: degToRad(270), endAngle: degToRad(0), clockwise: false)
        p.addLine(to: CGPoint (x:  x + w, y: y + h - borderRadiusBR)) // right line end
        p.addArc(center: CGPoint(x: x + w - borderRadiusBR, y: y + h - borderRadiusBR), radius: borderRadiusBR, startAngle: degToRad(0), endAngle: degToRad(90), clockwise: false)
        p.addLine(to: CGPoint (x:  x + borderRadiusBL, y: y + h)) // bottom line end
        p.addArc(center: CGPoint(x: x + borderRadiusBL, y: y + h - borderRadiusBL), radius: borderRadiusBL, startAngle: degToRad(90), endAngle: degToRad(180), clockwise: false)
        p.addLine(to: CGPoint (x:  x, y: y + borderRadiusTL)) // left line end
        p.addArc(center: CGPoint(x: x + borderRadiusTL, y: y + borderRadiusTL), radius: borderRadiusTL, startAngle: degToRad(180), endAngle: degToRad(270), clockwise: false)
        p.closeSubpath()
        return p
    }
    
    override func draw(_ rect: CGRect) {
        self.alpha = (self.unused==false)&&(self.isEnabled==true) ? 1.0:0.5;
        let state: CCButtonState = self.stateForIndex(currentState)
        let ctx: CGContext = UIGraphicsGetCurrentContext()!
        let buttonArea: CGRect = self.bounds.insetBy(dx: CGFloat(state.borderWidth) / 2.0, dy: CGFloat(state.borderWidth) / 2.0)
        var borderPath: CGPath
        
        if state.equalBorderRadius() {
            let radius: CGFloat = min(CGFloat(state.borderRadiusTL), min(buttonArea.size.width, buttonArea.size.height) / 2.0)
            borderPath = CGPath(roundedRect: buttonArea, cornerWidth: radius, cornerHeight: radius, transform: nil)
        }
        else {
            borderPath = self.createBorderPath(buttonArea, niftyState: state)
        }
        
        // Draw background
        if (state.backgroundGradient != nil) {
            ctx.saveGState()
                      
            let gradient: CGGradient = state.backgroundGradient.getGradient()
            
            ctx.addPath(borderPath)
            ctx.clip()
            var startPoint: CGPoint!
            var endPoint: CGPoint!
            
            if ( gradientIsLeftToRight == true){
                startPoint = CGPoint(x: 0, y: self.bounds.height)
                endPoint = CGPoint(x: self.bounds.width, y: self.bounds.height)
            } else {
                startPoint = CGPoint(x: buttonArea.midX, y: buttonArea.minY)
                endPoint = CGPoint(x: buttonArea.midX, y: buttonArea.maxY)
            }
            
            ctx.drawLinearGradient(gradient, start: startPoint, end: endPoint, options: CGGradientDrawingOptions(rawValue: 0))
            ctx.restoreGState()
        }
        else if (state.backgroundColor != nil) {
            ctx.addPath(borderPath)
            ctx.setFillColor(state.backgroundColor.cgColor)
            ctx.fillPath()
        }
		
		// highlight coloring useful for Pro Tools automation modes
		if (self.isHighlighted)
		{
            if highlightColor.cgColor.alpha > 0
            {
                ctx.addPath(borderPath)
                ctx.setFillColor(highlightColor.withAlphaComponent(0.5).cgColor)
                ctx.fillPath()
            }
		}
		
        // Draw border
        if (state.borderWidth > 0) {
            ctx.addPath(borderPath)
            ctx.setStrokeColor(state.borderColor.cgColor)
            ctx.setLineWidth(CGFloat(state.borderWidth))
            ctx.drawPath(using: .stroke)
        }
        
    }
    
    func getCurrentState() -> Int {
        return currentState
    }
    
    func setCurrentState(_ newState: Int) {
        currentState = newState
        self.setNeedsDisplay()
        let state: CCButtonState = self.stateForIndex(currentState)
        // set color
        if (state.textColor != nil) {
            self.setTitleColor(state.textColor, for: UIControl.State())
        }
        else {
            self.setTitleColor(originalColor, for: UIControl.State())
        }
        // set font
        if (state.textFont != nil) {
            self.titleLabel!.font = state.textFont
        }
        else if originalFont != nil {
            self.titleLabel!.font = originalFont
        }
        
    }
    
    func setText(_ text: String) {
        self.setTitle(text, for: UIControl.State())
    }

}
