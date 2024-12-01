let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

class Buble{
	constructor(){
		this.coor = []
		this.xPos = []
		this.yPos = []
		this.size = []
		this.pSize = []
		this.mP_color = ['#CDC1FF','#FF7EE2','#FFCCEA','#FF74B1','#F7C8E0','#F900BF','#FF00E4','#EA86B6','#E86ED0','#FF6BD6','#CDC1FF','#FF7EE2','#FFCCEA','#FF74B1','#F7C8E0','#F900BF','#FF00E4','#EA86B6','#E86ED0','#FF6BD6']
		this.coor_child = []
		this.curColor = []
		this.RUN = true
		this._sparkle = true
		this.mPink = false
	}

	updateNewValue(){
		for(let i = 0; i < this.coor.length; i++){
			var y = Math.floor(Math.random() * (85 - 2 + 1)) + 2
			var x = Math.floor(Math.random() * (95 - 1 + 1)) + 1
			var size = Math.floor(Math.random() * (25 - 15 + 1)) + 10
			var pSize = Math.floor(Math.random() * (50 - 25 + 1)) + 20
			this.xPos.push(x)
			this.yPos.push(y)
			this.size.push(size)
			this.pSize.push(pSize)
		}
	}

	updateCoordinate(){
		for(let i = 1; i<=2; i++){
			const bbBox = document.querySelector(`.bublebox${i}`)
			for(let k = 0; k < 10; k++){
				const bub = bbBox.querySelector(`#bb${k+1}-cc`)
				const bub_child = bub.querySelector(`.bb${k+1}`)
				this.coor_child.push(bub_child)
				this.coor.push(bub)
				this.curColor.push(bub.style.backgroundColor)
			}
		}
	}

	blink(size, parent, shadow_color){
		setTimeout(()=>{
			parent.style.transition = 'all 2s'
			parent.style.top = `${parent.offsetTop + 25}px`
		}, 250)
		for(let i = 0; i<2; i++){
			const star = document.createElement('div')
			parent.appendChild(star)

			star.style.width = '0px'
			star.style.height = '0px'
			star.style.borderRadius = '50%'
			star.style.position = 'absolute'
			star.style.transition = 'all 1s'
			star.style.boxShadow = `0px 0px 15px 1px ${shadow_color}`
			star.style.rotate = '0deg'

			star.style.backgroundColor = 'white'
			setTimeout(()=>{
				star.style.rotate = '360deg'
				if(i == 0){
					star.style.width = `${size + 15}px`
					star.style.height = `${2}px`
				}else if(i == 1){
					star.style.width = `${2}px`
					star.style.height = `${size + 15}px`
				}
				setTimeout(()=>{
					star.style.opacity = '0'
					setTimeout(()=>{
						star.remove()
					},1000)
				}, 750)
			}, 150)
		}
	}

	popVisual(){
		for(let i = 0; i < this.coor_child.length; i++){
			var index = this.coor_child[i]
			var x = this.xPos[i]
			var y = this.yPos[i]
			var size = Math.floor(Math.random() * (25 - 15 + 1)) + 10

			index.style.transition = 'all 1s'
			index.style.width = `${size + 20}px`
			index.style.height = `${size + 20}px`
			index.style.opacity = '0'

			if(this._sparkle){
				this.blink(index.offsetWidth, index.parentNode, getComputedStyle(index).backgroundColor)
			}
		}
		setTimeout(()=>{
			this.resetVisual(this.mPink)
		}, 1500)
	}

	runVisual(){
		this.updateNewValue()
		for(let v = 0; v < this.coor.length; v++){
			var index = this.coor[v]
			var cIndex = this.coor_child[v]
			var x = this.xPos[v]
			var y = this.yPos[v]
			var size
			if(this.mPink){
				size = this.pSize[v]
			}else{
				size = this.size[v]
			}

			index.style.transitionProperty = 'top'

			index.style.left = `${x}%`
			index.style.top = `${y}%`
			cIndex.style.width = `${size}px`
			cIndex.style.height = `${size}px`
		}
	}

	resetVisual(_mPink){
		this.xPos.length = 0
		this.yPos.length = 0
		this.size.length = 0
		for(let v = 0; v < this.coor.length; v++){
			var index = this.coor_child[v]
			var pIndex = this.coor[v]
			var color = this.curColor[v]
			var y = '100'
			var size = '10'

			pIndex.style.transitionProperty = 'none'

			console.log(this.coor.length)
			for(let k = 1; k <= 10; k++){
				var x = `${k}0`
				index.style.opacity = '1'
				if(_mPink){
					index.style.backgroundColor = this.mP_color[v]
					index.style.boxShadow = `0px 0px 50px 10px ${this.mP_color[v]}`
				}else{
					index.style.backgroundColor = color
				}
				pIndex.style.left = `${x}%`
				pIndex.style.top = `${y}%`
				index.style.width = `${size}px`
				index.style.height = `${size}px`
			}
		}
	}
}

var _click = new Audio('click.mp3')
var _hover = new Audio('hover.mp3')
var _load = new Audio('loading.mp3')
_click.volume = 0.5
_load.play()
var BB = new Buble()
BB.updateCoordinate()
run()

setInterval(run, 1650+1650);

function run(){
	if(BB.RUN){
		BB.runVisual()
		setTimeout(()=>{
			BB.popVisual()
		},1650)
	}
}

function runHeart(delay){
	const h_left = document.querySelector('.p-left')
	const h_right = document.querySelector('.p-right')
	setTimeout(()=>{
		if(isMobile){
			h_left.style.width = '250px'
			h_right.style.height = '250px'
		}else{
			h_left.style.width = '300px'
			h_right.style.height = '300px'
		}
		for(let i = 1; i<=2; i++){
			const shadow_bg = document.querySelector(`.heart-effects_container${i}`)
			if(i == 1){
				shadow_bg.style.boxShadow = 'inset 0px 0px 100px 15px #2f2634'
			}else if(i == 2){
				if(isMobile){
					shadow_bg.style.boxShadow = '#ffc0f7 0px 0px 250px 100px'
				}else{
					shadow_bg.style.boxShadow = '0px 0px 250px 125px #ffc0f7'
				}
			}
		}
		// setTimeout(()=>{
		// 	const fromme = document.querySelector('.fromme')
		// 	const ijustwant = document.querySelector('.ijustwant')
		// 	const iloveyou = document.querySelector('.iloveyou')
		// 	const bt_ily = iloveyou.childNodes[1]
		// 	const txt_ily = iloveyou.childNodes[3]

		// 	fromme.style.top = '50%'
		// 	fromme.style.opacity = '1'
		// 	setTimeout(()=>{
		// 		ijustwant.style.left = '50%'
		// 		ijustwant.style.opacity = '1'
		// 		setTimeout(()=>{
		// 			iloveyou.style.opacity = '1'
		// 			bt_ily.style.width = 'calc(100% + 50px)'
		// 			txt_ily.style.opacity = '1'
		// 			txt_ily.style.letterSpacing = '5px'
		// 		}, 2500)
		// 	}, 500)
		// },1000)
	}, delay)
}

const btn = document.getElementById('btn')
const main_cont = document.querySelector('.main_container')

function hover(on){
	const outline = document.querySelector('.outline_cir1').style
	if(on && !isMobile){_hover.play()}
	if(on){
		if(isMobile){outline.transition = 'all 2.5s'}
		outline.width = '100%'
		outline.height = '100%'
		outline.rotate = '360deg'
		outline.borderRadius = '50%'
		outline.outlineOffset = '100px'
	}else if(!on){
		if(isMobile){outline.transition = 'all 1s cubic-bezier(0.53, 0.15, 0.56, 0.98)'}
		outline.width = '0%'
		outline.height = '0%'
		outline.rotate = '0deg'
		outline.borderRadius = '0%'
		outline.outlineOffset = '0px'
	}

	for(let i = 0; i<2; i++){
		const line = document.querySelector(`.line${i+1}`).style
		const cir = document.querySelector(`.cir${i+1}`).style
		if(on){
			if(isMobile){
				line.transition = 'all 2.5s'
			}
			if(i == 0){
				cir.width = 'calc(100% + 50px)'
				cir.height = 'calc(100% + 50px)'
				if(isMobile){line.width='100vw'}else{line.width='50vw'}
				line.rotate = '180deg'
			}else if(i == 1){
				cir.width = 'calc(100% + 100px)'
				cir.height = 'calc(100% + 100px)'
				if(isMobile){line.height='100vw'}else{line.height='50vw'}
				line.rotate = '360deg'
			}
		}else if(!on){
			if(isMobile){
				line.transition = 'all 1s cubic-bezier(0.53, 0.15, 0.56, 0.98)'
			}
			cir.width = '0%'
			cir.height ='0%'
			line.rotate = '0deg'
			if(i == 0){				
				line.width='0vw'
			}else if(i == 1){
				line.height='0vw'
			}
		}
	}
}

function openArea(){
	document.querySelector('.button_cont').style.pointerEvents = 'none'
	setTimeout(()=>{
		hover(false)
		_click.play()
		for(let i = 0; i<2; i++){
			const line = document.querySelector(`.line${i+1}`)
			line.style.transition = 'all 3s'
			if(i == 0){
				line.style.rotate = '-180deg'
				if(isMobile){line.style.width='100vw'}else{line.style.width='50vw'}
				line.style.height = '75px'
			}else if(i == 1){
				line.style.rotate = '-360deg'
				if(isMobile){line.style.height='100vw'}else{line.style.height='50vw'}
				line.style.width = '75px'
			}
			setTimeout(()=>{
				line.style.width = '100vw'
				line.style.height = '100vh'
			}, 2750)
		}
	}, 500)
	setTimeout(()=>{
		main_cont.style.opacity = '1'
		main_cont.style.backgroundColor = getComputedStyle(document.querySelector('.line1')).backgroundColor
		for(let i = 0; i<2; i++){
			const line = document.querySelector(`.line${i+1}`)
			line.style.transition = 'none'
			line.style.height = '100vh'
			line.style.width = '100vw'
		}
		setTimeout(()=>{
			document.querySelector('.label').style.color = getComputedStyle(btn).backgroundColor
			setTimeout(()=>{
				document.querySelector('.label').remove()
				btn.style.position = 'absolute'
				btn.style.transition = 'all 3s'
				if(isMobile){
					btn.style.width = 'calc(100vh + 500px)'
					btn.style.height = 'calc(100vh + 500px)'
				}else{
					btn.style.width = 'calc(100vw + 250px)'
					btn.style.height = 'calc(100vw + 250px)'
				}
				setTimeout(()=>{
					_load.play()
					main_cont.style.backgroundColor = `transparent`
					document.querySelector('.container').remove()
					BB.RUN = true
					BB._sparkle = false
					BB.mPink = true
					BB.resetVisual(true)
					run()
					runHeart(0)
				}, 3000)
			}, 650)
		}, 250)
		BB.RUN = false
	},2650+2750+500)
}

if(isMobile){hover(true); BB._sparkle = false}

btn.addEventListener('click', openArea)
btn.addEventListener('mouseover', ()=>{hover(true)})
btn.addEventListener('mouseout', ()=>{hover(false)})