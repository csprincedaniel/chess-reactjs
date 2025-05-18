import './tile.css';

interface Props {
    image:string;
    number: Number;
}

export default function Tile({ number, image }: Props) {
    const isEven = (number.valueOf() + 1) % 2 === 0;
    const key = isEven ? 'tile white-tile' : 'tile black-tile';
    
    return (
       <div className={key}>
            {image && ( <div className='chess-piece' style={{backgroundImage: `url(${image})` }}></div>)}
       </div>
    );
}