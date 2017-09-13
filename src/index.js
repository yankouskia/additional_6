module.exports = function zeros(expression) {
    var mas = expression.split('*');
    var number=1;
    var result = 1;
    mas.map(function (item,i) {
        if(item.split('!').length==2){
            for(var x = 1;x<=item.substring(0,item.length-1);x++){
                number=multiply(''+number,''+x);
            }
            mas[i]=number;
            number=1;
        }else{
            if((item.substring(0,item.length-2)%2)==0){
                for(var x = 2;x<=item.substring(0,item.length-2);){
                    number= multiply(''+number,''+x);
                    x=x+2;
                }
                mas[i]=number;
                number=1;
            }
            else{
                for(var x = 1;x<=item.substring(0,item.length-2);){
                    number=multiply(''+number,''+x);
                    x=x+2;
                }
                mas[i]=number;
                number=1;
            }
        }
    })
    for(var y = 0;y<mas.length;y++){
        result=multiply(''+result,''+mas[y]);
    }
    result = (''+result).split('').reverse().join('');
    number=0;
    for(var i=0;i<result.length;i++){
        if(result[i]=='0'){
            number++;
        }else{
            break;
        }
    }
    return number;
}

function multiply(first, second) {
    var mas1 = first.split('').reverse();
    var mas2 = second.split('').reverse();
    var result = new Array(mas1.length + mas2.length).fill(0);
    for (var i = 0; i < mas2.length; i++) {
        for (var j = 0; j < mas1.length; j++) {
            result[j + i] = mas2[i] * mas1[j] + +result[j + i];
            if (('' + result[j + i]).length > 1) {
                result[j + i + 1] = +result[j + i + 1] + +('' + result[j + i])[0];
                result[j + i] = ('' + result[j + i])[1];
            }
        }
    }
    if (result[result.length - 1] == 0) {
        return result.reverse().join('').substr(1, result.length);
    }
    return result.reverse().join('');
}
