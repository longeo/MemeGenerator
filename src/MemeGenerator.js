import React, {Component} from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: ""
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }  
    changeHandler(event){
        const {name, value, type} = event.target
        this.setState({
            [name]: value
        })
    }

    submitHandler(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log([memes[0]])
            this.setState({
                allMemeImgs: memes
            })
            }
            )
        }
    
    render() {

        return (
            <div>
            <form className="meme-form" onSubmit={this.submitHandler}>
                <input 
                    type= "text" 
                    name="topText" 
                    placeholder="Enter Top Text" 
                    value={this.state.topText}
                    onChange={this.changeHandler}
                />

                <input 
                    type="text" 
                    name="bottomText" 
                    placeholder="Enter Bottom Text" 
                    value={this.state.bottomText} 
                    onChange={this.changeHandler}
                    />  
            
                <button>Gen</button>
            </form>
            <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
        </div>
        )
    }
}

export default MemeGenerator