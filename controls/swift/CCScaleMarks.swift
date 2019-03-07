//
//  CCScaleMarks.swift
//  Example
//
//  Created by Bernice Ling on 3/3/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import UIKit

class CCScaleMarks: UIView {
	@IBOutlet var master: AnyObject!	//master is used to get info how to arrange marke for master view

    var marks:Array<CCTaperMark>!
	
    var labelFontSize: NSNumber = 15
    var labelColor: UIColor = UIColor.black
    var labelWidth: NSNumber = 20
	var lineColor: UIColor = UIColor.black
	var disableLines: Bool = false
	var disableLabels: Bool = false
    var scaleIsVertical:Bool!
    var masterIsFader:Bool!
    var masterFader:CCFader!
	
    
    override init(frame: CGRect) {
        super.init(frame: frame)
		marks = Array<CCTaperMark>();
    }
    
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
		marks = Array<CCTaperMark>();
        if(self.bounds.size.height > self.bounds.size.width){
            scaleIsVertical = true
        } else {
            scaleIsVertical = false
        }
    }
    

    
    func setCCScaleMarks(_ scaleMarks:Array<CCTaperMark>){
        marks = scaleMarks
		self.setNeedsDisplay();
    }
    
    func getYPosForScaleValue(_ value: Float) -> Float {
		if (masterIsFader == true)
		{
			return ((1 - value) * (Float(self.bounds.size.height) - masterFader.getCapHeight())) + masterFader.getCapHeight()/2
		}
		return (1 - value) * (Float(self.bounds.size.height))
    }
    
    func getXPosForScaleValue(_ value: Float) -> Float {
        if (masterIsFader == true)
        {
             return (value * (Float(self.bounds.size.width) - masterFader.getCapWidth())) + masterFader.getCapWidth()/2
        }
            return value * (Float(self.bounds.size.width))
    }
    
       

    func updateSettings(){
       
        for view in self.subviews {
            view.removeFromSuperview()
        }
        self.setNeedsDisplay()
    }
    
    override func draw(_ rect: CGRect) {
        
        for view in self.subviews {
            view.removeFromSuperview()
        }
        
        let context: CGContext = UIGraphicsGetCurrentContext()!

 
        if (master != nil && master.isKind(of: CCFader.self)){
            masterFader = (master as! CCFader)
            masterIsFader = true
            
        } else {
            masterFader = nil
            masterIsFader = false
        }
        
        if (marks.count != 0)
        {
			if (!disableLines)
			{
				for i in 0 ..< marks.count {
                    
                    var x:CGFloat = 0.0;
                    var y:CGFloat = 0.0;
                    var xPos:CGFloat = 0.0;
                    var yPos:CGFloat = 0.0;
                   
					
                    if (scaleIsVertical == true){
                        yPos = CGFloat(Float(self.getYPosForScaleValue(marks[i].position)))
                        xPos = self.bounds.origin.x;
                        if !disableLabels
                        {
                            xPos = xPos + CGFloat(labelWidth) + 1
                        }
                        x = self.bounds.origin.x + self.bounds.size.width
                        y = CGFloat(yPos)
                    } else {
                        xPos = CGFloat(Float(self.getXPosForScaleValue(marks[i].position)))
                        let cTextBoxHeight: Float = 20
                        if !disableLabels
                        {
                            yPos = yPos + CGFloat(cTextBoxHeight) + 1
                        }
                        y = master.bounds.origin.y + self.bounds.size.height
                        x = xPos
                    }
                    
                    context.move(to: CGPoint(x: xPos, y: yPos))
                    context.addLine(to: CGPoint(x: x, y: y))
					
				}
				context.setStrokeColor(lineColor.cgColor);
				context.strokePath()
			}
            
            
 			if (!disableLabels)
			{
                let font: UIFont = UIFont(name: "Helvetica", size: CGFloat(labelFontSize))!
            
                let cTextBoxHeight: Float = 20
                let cTextBoxHalfHeight: Float = cTextBoxHeight / 2
                for i in 0 ..< marks.count {
                    
                    var x:CGFloat = 0.0;
                    var y:CGFloat = 0.0;
                    var w:CGFloat = 0.0;
                    var h:CGFloat = 0.0;
                    
                    if (scaleIsVertical == true){
                        let yPos: Float = self.getYPosForScaleValue(marks[i].position)
                        x = 0
                        y = CGFloat(yPos) - CGFloat(cTextBoxHalfHeight)
                        w = CGFloat(labelWidth)
                        h = CGFloat(cTextBoxHeight)
                    } else {
                        let xPos: Float = self.getXPosForScaleValue(marks[i].position)
                        x = CGFloat(xPos) - CGFloat(cTextBoxHalfHeight)
                        y = 0
                        w = CGFloat(labelWidth)
                        h = CGFloat(cTextBoxHeight)
                    }
                    
                    
                    let rect: CGRect = CGRect(x: x,y: y,width: w,height: h)
                    
                    let textStyle = NSMutableParagraphStyle()
                    textStyle.alignment = .right
                    let textFontAttributes = [
                        NSFontAttributeName: font,
                        NSParagraphStyleAttributeName: textStyle
                    ]
                    let label:UILabel = UILabel();
                    label.frame = rect;
                    label.textColor = labelColor;
                    label.clipsToBounds = false;
                    label.attributedText = NSAttributedString.init(string: marks[i].name, attributes: textFontAttributes);
                    if (scaleIsVertical == true){
                        label.textAlignment = .right;
                    } else {
                        label.textAlignment = .center;
                    }
                    
                    self.addSubview(label);
                }
			}
            
        }
        
    }


}
