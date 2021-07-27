var button=document.querySelectorAll('button');

//change color of button when click on
button.forEach((btn)=>{
   btn.onclick=function(){
       btn.style.backgroundColor="blue";
       setTimeout(()=>{
        btn.style.backgroundColor="#2D2A2B";
       },100);
   }
});

// get input value
var input=document.querySelector(".expression");
var inputarr=new Array();
//focus on input in start
input.focus();

///add event click
document.addEventListener("click",(e)=>{
           //get textcontent of button
         var getContent=e.target.textContent;
         //conver input to array          
         //append textvalues to input
        if(e.target.tagName=='BUTTON'){
             if(isOperator(getContent)){
                if(getContent=="-"){
                    if(inputarr.length==0 || inputarr[inputarr.length-1]=='('){
                        inputarr.push('0');inputarr.push('-');
                    }
                    else{
                        inputarr.push('-');
                    }
                }
                // console.log(inputarr.length);
                 if(inputarr.length>0 && isOperator(inputarr[inputarr.length-1])){
                   //repalce this digit by last one
                    inputarr[inputarr.length-1]=getContent; 
                  }else{inputarr.push(getContent);}
            }
             else if( getContent=='(' ){
                   if(inputarr.length>0 && isDigit(inputarr[inputarr.length-1])||inputarr[inputarr.length-1]==')'){
                      inputarr.push('*');
                   }
                   inputarr.push('(');
            }
            else if(getContent==')'){
                if(inputarr[inputarr.length-1]=='('){
                    inputarr.pop();
                }else{
                    inputarr.push(")");
                }
            }
             else if(getContent=="Ac"){
                    inputarr.length=0;//clear array 
                    input.focus();//foucus on input
                    input.classList.remove('disabled');
            }
             else if(getContent=="="){
                 /// var evaluator=new PostfixEvaluator();
                  var postfix=new PostfixExpress();//create object of PostfixExpress class
                  var evaluator=new PostfixEvaluator();//create object of PostfixExpress class

                  postfix.toPostfix(input.value);//convert expression to postfix
                  input.value=evaluator.evalutePostfix(postfix.getExpressionPostfixed());
                  if(!postfix.invalidExpression){
                      inputarr=Array.from(input.value);
                     // console.log(postfix.getExpressionPostfixed());
                  }
                  else if(postfix.invalidExpression || input.value=="NaN"){
                      inputarr=Array.from("Syntax Error");
                  }
                  //disble writing
            }
             else{
                 inputarr.push(getContent);
            }
        }
             //update input value again
             input.value="";
             inputarr.forEach((char)=>{
                 input.value+=char;
             });
                          
});

function isOperator(op){
    return op=='+'||op=='*'||op=='/'||op=='-'||op=='^';
}
function isDigit(op){
    return !isNaN(op);
}

