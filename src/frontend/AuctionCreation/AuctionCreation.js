import "./AuctionCreation.css";
import {useState} from "react";
const AuctionCreation = () => {
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");

    const handleSubmit = e=> {
        e.preventDefault();
        console.log("Name: "+name+" Price: "+price+" Description: "+description+" Photo: "+photo);
    }
    const handleChangeName = e=> {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleChangePrice = e=> {
        e.preventDefault();
        setPrice(e.target.value);
    }
    const handleChangeDescription = e=> {
        e.preventDefault();
        setDescription(e.target.value);
    }
    const handleChangePhoto = e=> {
        e.preventDefault();
        setPhoto(e.target.value);
    }
    
    return (
        <div id="creationMainDiv">
            <form method="get" onSubmit={handleSubmit}>
                <div className="inputBoxDiv">
                Item<br/>
                <input 
                    className="inputBoxCreationItem" 
                    type="text" 
                    placeholder="Item name" 
                    value={name} 
                    onChange={handleChangeName}
                />
                </div>
                <hr/>
                <div  className="inputBoxDiv">
                Price<br/>
                <input 
                    className="inputBoxCreationPrice" 
                    type="number" 
                    placeholder="Item basic price" 
                    value={price} 
                    onChange={handleChangePrice}
                />
                </div>
                <hr/>
                <div className="inputBoxDiv">
                Description<br/>
                <input 
                    className="inputBoxCreationDesc" 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={handleChangeDescription}
                    />
                </div>
                <hr/>
            
            <div className="inputBoxDiv">
                Photo    
                <input 
                    id="photoSelect"
                    type="file"
                    onChange={handleChangePhoto}
                />
            </div>
            <hr/>

            <div className="createDiv">
                <input
                    type="submit" 
                    id="createBtn" 
                    value="Create"
                />
            </div>
            </form>
        </div>
    )
}
export default AuctionCreation;