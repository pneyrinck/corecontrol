//
//  CCKnob.swift
//  Example
//
//  Created by Bernice Ling on 6/24/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

class CCKnob: UIButton {
    
    var position = 0.0
    var lastpoint = CGPoint(x:0.0, y:0.0)
    var firsthandle = false
//    var lit: Bool
    var isPanning = false
    var isLinear = false
    var startAngle = 0.0
//    var dawMode: String
//    var displayValue: UILabel
//    var displayName: UILabel
//    var numdots: Int
//    var mode: Int
//    var centerLightOn: Bool
//    var rawposition: Float
//    var basePosition: Float
//    var initPosition: Float
//    var label1Y: Float
//    var label2Y: Float
    var numTicks = 0
//    var enabled: Bool

    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)

        self.backgroundColor = UIColor.clearColor()
        position = 6.0 / 11.0
        let recognizer: UIPanGestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(CCKnob.handlePan(_:)))
        self.addGestureRecognizer(recognizer)
        
    }
    
    
    
    func handlePan(recognizer: UIPanGestureRecognizer) {
        let translation: CGPoint = recognizer.locationInView(self)
        var x: CGFloat
        var y: CGFloat
        let ourSize: CGSize = self.frame.size
        var center = CGPoint(x:0.0, y:0.0)
        center.x = ourSize.width / 2
        center.y = ourSize.height / 2
        x = translation.x - center.x
        y = translation.y - center.y
        
        if isnan(x) || isnan(y) {
            return
        }
        
        if (firsthandle) {
            isPanning = true
            firsthandle = false
            lastpoint = translation
            let rad = (x * x + y * y)
            if rad > 250 {
                isLinear = false
                startAngle = Double(atan2(y, x))
            }
            else {
                isLinear = true
            }
        }
        else {
            var angle = 0.0
            if isLinear {
                numTicks = Int(((translation.x - lastpoint.x) + (translation.y - lastpoint.y)) * 0.5)
                // top-right gain.
            }
            else {
                let goatseconstant = 50.0
                angle = atan2(Double(y), Double(x))
                if angle * startAngle < 0 && fabs(angle - startAngle) > 3.141 {
                    if angle < 0 {
                        startAngle -= 3.14159 * 2
                    }
                    else {
                        startAngle += 3.14159 * 2
                    }
                }
                numTicks = Int((angle - startAngle) * goatseconstant)
                // goatse constant.
            }
            if numTicks != 0 {
                self.sendActionsForControlEvents(.ValueChanged)
                lastpoint = translation
                startAngle = angle
            }

        }
        
    }


}

