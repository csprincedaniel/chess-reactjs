"use client"
import './chessboard.css';
import Tile from '../Tile/tile';
import React from 'react';
import {useRef, useState} from 'react'
import Referee from "@/app/Referee/referee"


const verticalAxis = ["1","2","3","4","5","6","7","8"];
const horizontalAxis = ['a','b','c','d','e','f','g','h'];

export interface Piece{
    image: string
    x: number
    y: number
    type: PieceType
    team: TeamType
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType{
    OPPONENT,
    OUR
}

const pieces: Piece[] = []
const initialBoardState: Piece[] = []

for (let p = 0; p < 2; p++){
    const teamType = (p===0)? TeamType.OPPONENT : TeamType.OUR
    const type = (teamType === TeamType.OPPONENT) ? "black" : "white"
    const y = (p === 0)? 7:0;

    initialBoardState.push({image: `/pieces/${type}-rook.png`,x:0,y:y, type: PieceType.ROOK, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-rook.png`,x:7,y:y, type: PieceType.ROOK, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-knight.png`,x:1,y:y, type: PieceType.KNIGHT, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-knight.png`,x:6,y:y, type: PieceType.KNIGHT, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-bishop.png`,x:2,y:y, type: PieceType.BISHOP, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-bishop.png`,x:5,y:y, type: PieceType.BISHOP, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-queen.png`,x:3,y:y, type: PieceType.QUEEN, team:teamType})
    initialBoardState.push({image: `/pieces/${type}-king.png`,x:4,y:y, type: PieceType.KING, team:teamType})
}


for (let i = 0; i < 8; i++){
    initialBoardState.push({image: "/pieces/black-pawn.png",x:i,y:6, type: PieceType.PAWN, team:TeamType.OPPONENT})
    initialBoardState.push({image: "/pieces/white-pawn.png",x:i,y:1, type: PieceType.PAWN, team:TeamType.OUR})
}

let activePiece: HTMLElement | null = null



export default function Chessboard() {
    const referee = new Referee()
    const chessboardRef = useRef<HTMLDivElement>(null)
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const [gridX, setX] = useState(0)
    const [gridY, setY] = useState(0)
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    let board = []; 
    
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const ans = j + i;
            const piece = pieces.find(p => p.x === i && p.y === j);
            let img = piece ? piece.image : "";

            board.push(<Tile key={`${i}${j}`}image={img} number={ans}/>);
        }
    }

    function grabPiece(e: React.MouseEvent<HTMLDivElement>){
        const target = e.target as HTMLElement
        const chessboard = chessboardRef.current;
        if (!chessboard || !target.classList.contains('chess-piece')) return;
        const tileSize = chessboard.clientWidth / 8;
     
        if (target.classList.contains('chess-piece')){
            const x = e.clientX - 50
            const y = e.clientY
            const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / tileSize);
            const gridY = 7 - Math.floor((e.clientY - chessboard.offsetTop) / tileSize);
            setX(gridX)
            setY(gridY)
            target.style.position='absolute'
            target.style.left= `${x}px`
            target.style.top = `${y}px`
    
            setActivePiece(target)
        }
    
    
    }
    
    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 13;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth -50;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 59;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            
            activePiece.style.position = "absolute";
            
            // Constrain X position
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }
            
            // Constrain Y position
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }
        }
    }
    
    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const tileSize = chessboard.clientWidth / 8; // Each tile is 62.5px if board is 500px
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / tileSize);
            const y = 7 - Math.floor((e.clientY - chessboard.offsetTop) / tileSize);
            console.log(x,y)
            

            //UPDATES THE PIECE POSITION
            setPieces((value) => {
                const pieces = value.map(p=>{
                    if(p.x === gridX && p.y === gridY){
                        const valid = referee.isValueMove(gridX, gridY, x,y, p.type, p.team,value)
                        if (valid){
                            p.x = x
                            p.y = y
                        } else {
                            activePiece.style.position = 'relative'
                            activePiece.style.removeProperty('top')
                            activePiece.style.removeProperty('left')
                        }
                    }
                    return p
                })
                return pieces;
            });
            setActivePiece(null);
        }
    }
    
    return <div 
    onMouseMove={movePiece}
    onMouseDown={grabPiece} 
    onMouseUp={dropPiece}
    id='chessboard'
    ref = {chessboardRef}
    >{board}
    </div>;
}