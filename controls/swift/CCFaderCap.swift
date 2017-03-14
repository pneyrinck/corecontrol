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
        self.userInteractionEnabled = true
        
        let dtap = UITapGestureRecognizer(target: self, action:Selector("handleDoubleTap:"))
        dtap.numberOfTapsRequired = 2
        self.addGestureRecognizer(dtap)
    }
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    
    func handleDoubleTap(recognizer: UITapGestureRecognizer? = nil) {
        let faderView: CCFader = self.superview as! CCFader
        faderView.setCapTouched(false)
        faderView.handleDoubleTap()
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
        let faderView: CCFader = self.superview as! CCFader
        faderView.setCapTouched(true)
    }
    
    override func touchesMoved(touches: Set<UITouch>, withEvent event: UIEvent?) {
        let faderView: CCFader = (self.superview as! CCFader)
        if (faderView.capTouched == false){
            return
        }
        
        var t: [AnyObject] = Array(touches)
        let numTouches: Int = t.count
        if numTouches != 1 { return }
        let touch: UITouch = t[0] as! UITouch
        let nowPoint: CGPoint = touch.locationInView(self.superview)
        let previousPoint: CGPoint = touch.previousLocationInView(self.superview)
        
        if (faderView.faderIsVertical == true){
            faderView.setTouchDelta(Float(nowPoint.y) - Float(previousPoint.y))
        } else {
            faderView.setTouchDelta(Float(previousPoint.x) - Float(nowPoint.x))
        }
        
    }
    
    override func touchesEnded(touches: Set<UITouch>, withEvent event: UIEvent?) {
        let faderView: CCFader = (self.superview as! CCFader)
        let t: [AnyObject] = Array(touches)
        let numTouches: Int = t.count
        if numTouches != 1 { return }
        faderView.setCapTouched(false)
    }
    
}
