let user=[
    {
        profile:"https://th.bing.com/th/id/OIP.mEyGU1m8bAvla1EkauiAOwHaLH?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        displayPicture:"https://timesofindia.indiatimes.com/photo/85426060/85426060.jpg",
        pendingMassages:3,
        location:"Mumbai,India",
        name:"Nishi",
        age:23,
        interast:[{
            
            icon:`<i class="ri-music-fill"></i>`,
            interest:"music"
        }],
        bio:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum autem quod, porro aperiam sit quia et assumenda iure dolores eveniet ?",
        isFriends:null
    },
    {
        profile:"https://th.bing.com/th/id/OIP.70qiYhYu45pdLXgVdCrA7QHaLE?w=204&h=305&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        displayPicture:"https://th.bing.com/th/id/OIP.TTNuRav-UOjJ2dFkhZvhNAHaLH?w=208&h=305&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        pendingMassages:5,
        location:"Nagpur,India",
        name:"Vanshika",
        age:26,
        interast:[{
            icon:`<i class="ri-quill-pen-fill"></i>`,
            interest:"painting"
        },{
            icon:`<i class="ri-music-fill"></i>`,
            interest:"music"
        }],
        bio:"Lorem ipsum, dolor sit amet consectetur  aperiam sit quia et assumenda iure dolores eveniet ?",
        isFriends:null
    },
    {
        profile:"https://th.bing.com/th/id/OIP.48C1fjm5A4taM6KNeVPyTQHaKI?w=208&h=285&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        displayPicture:"https://jooinn.com/images/portrait-of-young-woman.jpg",
        pendingMassages:3,
        location:"Delhi,India",
        name:"avinya",
        age:23,
        interast:[{
            icon:`<i class="ri-quill-pen-fill"></i>`,
            interest:"painting"
        },{
            icon:`<i class="ri-music-fill"></i>`,
            interest:"music"
        }],
        bio:"Lorem ipsum, dolor sit amet dolores eveniet ?",
        isFriends:null
    },
    {       
        profile:"https://th.bing.com/th/id/OIP.yukQOp6I_TD55GL94gWQLAHaJQ?w=208&h=260&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        displayPicture:"https://i.pinimg.com/originals/26/67/f0/2667f080b580bd424cde0381e09af0bb.jpg",
        pendingMassages:9,
        location:"Mumbai,India",
        name:"Shivangi",
        age:33,
        interast:[{
            icon:`<i class="ri-quill-pen-fill"></i>`,
            interest:"painting"
        }],
        bio:"Lorem ipsum, autem quod, porro aperiam sit quia et assumenda iure dolores eveniet ?",
        isFriends:null
    },
];
let curr=0;
let isAnimating=false;

function select(ele){
    return document.querySelector(ele)
}

function setData(index){
 
    select(".Profile img").src=user[index].profile;
    select(".badge h5").textContent=user[index].pendingMassages;
    select(".location h1").textContent=user[index].location;
    select(".hel h1").textContent=user[index].name;
    select(".hel h2").textContent=user[index].age;
    select(".bio p").textContent=user[index].bio;

    let clutter="";
    user[index].interast.forEach(function(interasts) {
        clutter+=`<div class="tag flex gap-2 items-center  bg-white/30 py-1 px-5 rounded-full">
        ${interasts.icon}</i>
        <h3 class="text-sm tracking-tighter capitalize ">${interasts.interest}</h3>
    </div>`
        
    });
    select(".tags").innerHTML=clutter;

}


function setInitial(){
    select()
    select(".mainCard img").src=user[curr].displayPicture;
    select(".incommingCard img").src=user[curr+1]?.displayPicture;
    setData(curr)
    curr=2;
    

}

function changeImage() {
    if(!isAnimating){
        isAnimating=true;
        let tl=gsap.timeline({
            onComplete:function(){
                isAnimating=false;
                let main=select(".mainCard")
                let incomming=select(".incommingCard")
    
                incomming.classList.remove("z-[2]");
                incomming.classList.add("z-[3]");
                incomming.classList.remove("incommingCard")
            
                main.classList.remove("z-[3]");
                main.classList.add("z-[2]");
    
                gsap.to(main,{
                    opacity:1,
                    scale:1
                })
                if(curr === user.length) curr =0;
                select(".mainCard img").src=user[curr].displayPicture;
                curr++;
                main.classList.remove("mainCard")
                main.classList.add("incommingCard")
                incomming.classList.add("mainCard")
    
            }
    
        })
    
        tl.to(".mainCard",{
            scale:1.2,
            opacity:0,
            duration:.7,
            ease:Circ
        },"a")
        tl.from(".incommingCard",{
            scale:.9,
            opacity:0,
            duration:1.2,
            ease:Circ
        },"a")
        
    }
    
    
}
let reject=select(".reject")
let accept=select(".accept")


reject.addEventListener("click",function(){
    changeImage();
    setData(curr-1);
        gsap.from(".detailsContainer .element",{
            
            y:"100%",
            stagger:.1,
            opacity:0,
            ease:Circ,
            duration:.8,
        })
        
})
accept.addEventListener("click",function(){
    changeImage();
    setData(curr-1);
        gsap.from(".detailsContainer .element",{
            
            y:"100%",
            stagger:.1,
            opacity:0,
            ease:Circ,
            duration:.2,
        })
        gsap.from(".heart",{
            ease:Circ,
            opacity:1,
        })
})


function createDiv(){
    document.querySelectorAll(".element").forEach(function(element){

        let div=document.createElement("div")
        div.classList.add(`${element.classList[1]}_Container`,"overflow-hidden");
        div.appendChild(element)
        select(".detailsContainer").appendChild(div)
        
    })
}
createDiv()


setInitial()

