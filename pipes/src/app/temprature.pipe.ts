import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'tempraturePipe',
    standalone: true
})
export class TempraturePipe implements PipeTransform{
    transform(
            value: any,
            inputType: 'cel' | 'fah', 
            outputType: 'cel' | 'fah' 
        ) { 
        let val;

        if(typeof val === 'string'){
            val = parseInt(value)
        } else {
            val = value
        }

        let outputTemp: number;
        if(inputType === 'cel' && outputType === 'fah'){
            outputTemp = val * (9 / 5) + 32;
        }else if (inputType === 'fah' && outputType === 'cel'){
            outputTemp = (val - 32) * (5 / 9)
        }else {
            outputTemp = val
        }

        let symbol: 'c' | 'F';
        if(!outputType){
            symbol = inputType === 'cel' ? 'c' : 'F'
        }else {
            symbol = outputType === 'fah' ? 'F' : 'c'
        }
        return `${outputTemp} ${symbol}`
    }
    
}