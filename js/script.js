const slider=document.querySelector(".slide-container")

slides=Array.from(document.querySelectorAll('.slide'))

let isDragging=false,

startPosition=0,
currentTranslate=0,
previousTranslate=0,
animationID=0,
curIndex=0

slides.forEach((slide,index)=>{
    const slideImage=slide.querySelector('img')
    slideImage.addEventListener('dragstart', (e)=> e.preventDefault())


    //mobile
    slide.addEventListener("touchstart",touchStart(index)
    )

    slide.addEventListener("touchend",touchEnd)
    slide.addEventListener("touchmove",touchMove)


    //pc
    slide.addEventListener("mousedown",touchStart(index))
    slide.addEventListener("mouseup",touchEnd)
    slide.addEventListener("mouseleave",touchEnd)
    slide.addEventListener("mousemove",touchMove)

})


window.oncontextmenu=function(event){
    event.preventDefault()
    event.stopPropagation()
    return false
}


function touchStart(index){
    return function(event){
        curIndex=index
        startPosition=getPositionX(event)
        isDragging=true

        animationID=requestAnimationFrame(animation)
        slider.classList.add('grabbing')

    }
}


function touchEnd(){
      
      isDragging=false
      cancelAnimationFrame(animationID)

      const movedBy=currentTranslate-previousTranslate

      if(movedBy<-100 && curIndex<slides.length - 1)
      curIndex+=1

      if(movedBy>100 && curIndex>0)
      curIndex-=1
      setPositionByIndex()

      slider.classList.remove('grabbing')

 
}


function touchMove(){
    if(isDragging){
        const currentPosition=getPositionX(event)
        currentTranslate=previousTranslate+currentPosition-startPosition


    }
    
        
}

function getPositionX(event){
    return event.type.includes('mouse')?event.pageX :event.touches[0].clientX
        
}

function animation(){
   setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)


}

function setSliderPosition(){
    slider.style.transform=`translateX(${currentTranslate}px)`
}

function setPositionByIndex(){
    currentTranslate=curIndex*-window.innerWidth

    previousTranslate=currentTranslate
    setSliderPosition()
}
