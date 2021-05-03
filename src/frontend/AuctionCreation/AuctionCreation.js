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
                <label>
                    Item
                    <input 
                        className="inputBox" 
                        type="text" 
                        placeholder="Item name" 
                        value={name} 
                        onChange={handleChangeName}
                    />
                    <br/>
                </label>
                
                <label>
                    Price
                    <input 
                        className="inputBox" 
                        type="number" 
                        placeholder="Item basic price" 
                        value={price} 
                        onChange={handleChangePrice}
                    />
                    <br/>
                </label>
                
                <label>
                    Description
                    <input 
                        className="inputBox" 
                        type="text" 
                        placeholder="Description" 
                        value={description} 
                        onChange={handleChangeDescription}
                    />
                    <br/>
                </label>

                <label>
                    Photo
                    
                    <input 
                        id="photoSelect"
                        type="file"
                        onChange={handleChangePhoto}
                        dataButtonText="a"
                        />
                    <br/>
                </label>
                
                    <input 
                    type="submit" 
                    id="createBtn" 
                    value="Create"
                    />
            </form>
        </div>
    )
}
export default AuctionCreation;