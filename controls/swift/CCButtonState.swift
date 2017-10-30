//
//  CCButtonState.swift
//  Example
//
//  Created by Bernice Ling on 3/4/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit
import Foundation


class CCButtonState: NSObject {
    
    var borderRadiusTL : CGFloat!
    var borderRadiusTR : CGFloat!
    var borderRadiusBL : CGFloat!
    var borderRadiusBR : CGFloat!
    var borderWidth : CGFloat!
    var borderColor : UIColor!
    var textFont : UIFont!
    var textColor : UIColor!
    var backgroundColor : UIColor!
    var backgroundGradient : CCGradient!
    
    override init(){
        super.init()
        self.setBorderRadius(0.0)
        borderWidth = 1.0
        borderColor = UIColor.black
        textFont = nil
        textColor = nil
        backgroundColor = UIColor.gray
    }
    
    init(_ other: CCButtonState) {
        borderRadiusTL = other.borderRadiusTL
        borderRadiusTR = other.borderRadiusTR
        borderRadiusBL = other.borderRadiusBL
        borderRadiusBR = other.borderRadiusBR
        borderWidth = other.borderWidth
        borderColor = other.borderColor
        textFont = other.textFont
        textColor = other.textColor
        backgroundColor = other.backgroundColor
        backgroundGradient = other.backgroundGradient
    }
    
    func setBorderRadius(_ radius: CGFloat) {
        self.borderRadiusTL = radius
        self.borderRadiusTR = radius
        self.borderRadiusBL = radius
        self.borderRadiusBR = radius
    }
    
    func equalBorderRadius() -> Bool {
        return borderRadiusTL == borderRadiusTR && borderRadiusTL == borderRadiusBL && borderRadiusTL == borderRadiusBR
    }
    
    class func colorWithR(_ r: Int, G g: Int, B b: Int) -> UIColor {
        return UIColor(red: CGFloat(Float(r) / 255.0), green: CGFloat(Float(g) / 255.0), blue: CGFloat(Float(b) / 255.0), alpha: 1.0)
    }
    
    class func colorWithR(_ r: Int, G g: Int, B b: Int, A a: Int) -> UIColor {
        return UIColor(red: CGFloat(Float(r) / 255.0) , green: CGFloat(Float(g) / 255.0), blue: CGFloat(Float(b) / 255.0), alpha: CGFloat(Float(a) / 255.0))
    }
    
    class func grayButton() -> CCButtonState {
        var state: CCButtonState? = nil
        state = CCButtonState()
        state!.textColor = CCButtonState.colorWithR(255, G: 255, B: 255)
        state!.backgroundColor = CCButtonState.colorWithR(64, G: 64, B: 64)
        return state!
    }
    
    class func activeGrayButton() -> CCButtonState {
        var state: CCButtonState? = nil
        state = CCButtonState()
        state!.textColor = UIColor.white
        state!.backgroundColor = UIColor.green
        return state!
    }
}
