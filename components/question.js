export function Question({question, answerClicked}) {
  
  return ( 
    <div>
    <p>{question?.text}</p>
    {question?.answers?.map((el,index)=><p><button onClick={()=>answerClicked(index)} key={el} >{el.text}</button></p>)}
    </div> );
}
