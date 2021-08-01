import React,{Component} from 'react';
import {View ,Text} from 'react-native'
import { getMetricMetaInfo ,timeToString} from "../utils/helpers";
import Stepper from './Stepper';
import Slider from './Slider'
import DateHeader from './DateHeader';
class AddEntry extends Component{
    state={
        run:0,
        bike:0,
        sleep:0,
        swim:0,
        eat:0
    }

    increment=(metric)=>{
        const {max,step}=getMetricMetaInfo(metric);
        this.setState((state)=>{
            const count=state[metric]+step;

            return{
                ...state,
                [metric]: count>max?max:count
            }
            
        })
    }

    decrement=(metric)=>{
        const {step}=getMetricMetaInfo(metric);
        this.setState((state)=>{
            const count=state[metric]-step;

            return{
                ...state,
                [metric]: count<0?0:count
            }
            
        })
    }

    slide=(metric,value)=>{
        this.setState(()=>({
            [metric]:value
        }))
    }

    submit=()=>{
        const key=timeToString();
        const entry=this.state
        //Update Redux
        //Navigate to Home
        //Save to DB
        //Create Local Notification
    }


render(){
    const metricInfo=getMetricMetaInfo();
    console.warn(metricInfo)
    return(
        <View>
            {Object.keys(metricInfo).map((key)=>{
            const {getIcon,type,...rest}=metricInfo[key];
            const value=this.state[key];
             
            return(
      <View key={key}>
          {getIcon()}
          {type==="slider"?<Slider {...rest} value={value} onChange={(value)=>this.slide(key,value)}/>:<Stepper  {...rest} value={value} onIncrement={()=>
            this.increment(key)} onDecrement={()=>this.decrement(key)}/>}
      </View>

        )})}
         <DateHeader date={new Date().toLocaleDateString()}/>
           
        </View>
    )
}

}



export default AddEntry;