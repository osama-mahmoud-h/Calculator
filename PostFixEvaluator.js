class PostfixEvaluator{
    constructor(){
    }
    evalutePostfix(queue){
        var stack=[];
        queue.forEach((str)=>{
             if(!isOperator(str)){
                 stack.push(parseFloat(str));
             }
             else{
                var val2=stack.pop();
                var val1=stack.pop();
                if(str=="+"){
                    stack.push(val1+val2);
                }
                else if(str=="-"){
                    stack.push(val1-val2);
                }
                else if(str=='*'){
                    stack.push(val1*val2);
                }
                else if(str=='/'){
                    stack.push(val1/val2);
                }
                else if(str=='^'){
                    stack.push(Math.pow(val1,val2));
                }
             }
        });
        return stack.length>0?stack.pop():"Syntax Error";
    }
    isOperator(op){
        return op=='+'||op=='*'||op=='/'||op=='-'||op=='^';
    }
}