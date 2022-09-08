import { Dimensions } from "react-native";
import React from "react";
const {height,width} = Dimensions.get('window')

const setHeight = (h)=>(height/100) * h
const setWidth = (w) => (width/100) * w

export default {setHeight,setWidth}