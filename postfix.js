class PostfixExpress{
    constructor(){

    }
     queue=[];//queue 
     invalidExpression=false;

     toPostfix(expression) {
        var stack=[];
        var n=expression.length;//get length of string
        var charArray=Array.from(expression);

        for(var i=0;i<n;i++){

            var c=charArray[i];

            if(isDigit(c)||c=='.'){
               var append="";
               while(i<n && isDigit(charArray[i]) || charArray[i]=='.'){
                   append+=charArray[i];
                   i++;
               }
               this.queue.push(append);
               if(i>=n){break;}
                  i--;
            }
            else if(c=="("){
                stack.push('(');
            }
            else if(c==")"){
                while(stack.length>0 && stack[stack.length-1]!='('){
                    this.queue.push(stack.pop());
                }
                stack.pop();
            }
            else{
                while(stack.length>0 && this.priority(c)<=this.priority(stack[stack.length-1])){
                    this.queue.push(stack.pop());
                }
                stack.push(c);
            }
        }//end of outer for loop

        //check if stack have element
        while(stack.length>0){
            var peek=stack.pop();
            if(peek=='('){
                this.invalidExpression=true;
                console.log("invalid");
                break;
            }
            this.queue.push(peek);
        }
    }

    isDigit(op){
        return !isNaN(op);
    }
    priority(c){
        switch(c){
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                 return 3;
                
          }
     return -1;
    }
    getExpressionPostfixed(){
        return this.queue;
    }
}