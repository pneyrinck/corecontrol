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
        borderColor = UIColor.blackColor()
        textFont = nil
        textColor = nil
        backgroundColor = UIColor.grayColor()
        
    }
    
    func setBorderRadius(radius: CGFloat) {
        self.borderRadiusTL = radius
        self.borderRadiusTR = radius
        self.borderRadiusBL = radius
        self.borderRadiusBR = radius
    }
    
    func equalBorderRadius() -> Bool {
        return borderRadiusTL == borderRadiusTR && borderRadiusTL == borderRadiusBL && borderRadiusTL == borderRadiusBR
    }
    
    class func colorWithR(r: Int, G g: Int, B b: Int) -> UIColor {
        return UIColor(red: CGFloat(r / 255), green: CGFloat(g / 255), blue: CGFloat(b / 255), alpha: 1.0)
    }
    
    class func colorWithR(r: Int, G g: Int, B b: Int, A a: Int) -> UIColor {
        return UIColor(red: CGFloat(r / 255) , green: CGFloat(g / 255), blue: CGFloat(b / 255), alpha: CGFloat(a / 255))
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
        state!.textColor = UIColor.whiteColor()
        state!.backgroundColor = UIColor.greenColor()
        return state!
    }
}
