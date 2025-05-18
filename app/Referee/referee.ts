import { PieceType, TeamType } from "@/Components/Chessboard/chesboard"

export default class Referee {
    isValueMove(px:number, py:number, x:number, y:number, type:PieceType, team: TeamType){

        if(type == PieceType.PAWN){
            if (team == TeamType.OUR){
                if ((px === x) && (y-py === 2) && py === 1){
                    console.log("Valid")
                    console.log(`x and px: ${x}, ${px} `)
                    return true
                } else if (px === x && y - py === 1) {
                    return true;
                }
            }
        }
        return false
    }
}