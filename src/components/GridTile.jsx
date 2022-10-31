import './GridTile.css'
export default function GridTile({ box, hendleChoice, flipped }){

    const handleClick = () => {
        hendleChoice(box);
    }

    return (
        <div className={flipped ? "flipped" : ""}>
            <button 
                className={`${box.color} lg:p-20 p-12 rounded-lg front`}
            ></button>
            <button 
                className="bg-gray-300 lg:p-20 p-12 rounded-lg back"
                onClick={handleClick}
            ></button>
        </div>
    );
}