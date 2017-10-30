//
//  CCGradient.swift
//  Example
//
//  Created by Bernice Ling on 3/4/16.
//  Copyright © 2016 Neyrinck. All rights reserved.
//

import Foundation
import CoreGraphics

func rgba(_ r:Int, g:Int, b:Int, a:Int )->Int{
    return (r << 24) | (g << 16) | (b << 8) | (a * 255)
}

class CCGradient: NSObject {
    
    var pos: NSMutableArray!
    var col: NSMutableArray!
    
    
    override init(){
        super.init()
        pos = NSMutableArray()
        col =  NSMutableArray()
    }
    
   
    
    func addColor(_ rgba: Int, at step: Int) {
        pos.add(Double(step)/100.0)
        col.add(Int(rgba))
    }
    
    
    func CGGradient() -> CGGradient {
        var gradient: CGGradient
        var colorspace: CGColorSpace
        let num_locations: Int = pos.count
        var locations :[CGFloat] = []
        var components:[CGFloat] = []
        
        for i in 0 ..< num_locations {
            locations.insert(CGFloat(pos[i] as! NSNumber), at: i)
            let rgba_col: UInt32 = UInt32((col[i] as AnyObject).uintValue)
            components.insert(CGFloat((rgba_col & 0xFF000000) >> 24) / 255.0, at: (i * 4 + 0))
            components.insert(CGFloat((rgba_col & 0x00FF0000) >> 16) / 255.0, at: (i * 4 + 1))
            components.insert(CGFloat((rgba_col & 0x0000FF00) >> 8) / 255.0, at: (i * 4 + 2))
            components.insert(CGFloat((rgba_col & 0x000000FF) >> 0) / 255.0, at: (i * 4 + 3))
        }
        colorspace = CGColorSpaceCreateDeviceRGB()
        gradient = CGGradient(colorSpace: colorspace, colorComponents: components, locations: locations, count: num_locations)!
    
        return gradient
    }

}
