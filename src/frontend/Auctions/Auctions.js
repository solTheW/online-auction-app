import AuctionItem from "./AuctionItem/AuctionItem";
import "./Auctions.css";

const AuctionsData = [
    {
        id:1,
        name: "Bike",
        image: "",
        value: 100,
        desc: "I am selling new bike, greate for kids.",
    },
    {        
        id:2,
        name: "Shoes",
        image: "",
        value: 200,
        desc: "I am selling new shoes.",
    },
    {        
        id:3,
        name: "Laptop",
        image: "",
        value: 1000,
        desc: "I am selling new laptop.",
    },
]
const Auctions = () => {
    const auctionsList = AuctionsData.map(el=>{
       return <AuctionItem key={el.id} id ={el.id} name={el.name} value={el.value} desc={el.desc} />
    })
    return (
        <div id="auctionsListDiv">
        {auctionsList}    
        </div>
    )
}
export default Auctions;