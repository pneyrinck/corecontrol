//
//  CCFaderCap.swift
//  Example
//
//  Created by Bernice Ling on 2/26/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

class CCFaderCap: CCButton {
    var fader : Int!
    
    override init(frame: CGRect) {
        fader = 0
        super.init(frame: frame)
        self.isUserInteractionEnabled = true
        
        let dtap = UITapGestureRecognizer(target: self, action:#selector(CCFaderCap.handleDoubleTap(_:)))
        dtap.numberOfTapsRequired = 2
        self.addGestureRecognizer(dtap)
    }
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    
    @objc func handleDoubleTap(_ recognizer: UITapGestureRecognizer? = nil) {
        let faderView: CCFader = self.superview as! CCFader
        faderView.setCapTouched(isTouched: false)
        faderView.handleDoubleTap()
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        let faderView: CCFader = self.superview as! CCFader
        faderView.setCapTouched(isTouched: true)
    }
    
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        let faderView: CCFader = (self.superview as! CCFader)
        if (faderView.capTouched == false){
            return
        }
        
        let t: [AnyObject] = Array(touches)
        let numTouches: Int = t.count
        if numTouches != 1 { return }
        let touch: UITouch = t[0] as! UITouch
        let nowPoint: CGPoint = touch.location(in: self.superview)
        let previousPoint: CGPoint = touch.previousLocation(in: self.superview)
        
        if (faderView.faderIsVertical == true){
            faderView.setTouchDelta(Float(nowPoint.y) - Float(previousPoint.y))
        } else {
            faderView.setTouchDelta(Float(previousPoint.x) - Float(nowPoint.x))
        }
        
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        let faderView: CCFader = (self.superview as! CCFader)
        let t: [AnyObject] = Array(touches)
        let numTouches: Int = t.count
        if numTouches != 1 { return }
        faderView.setCapTouched(isTouched: false)
    }
    
}
