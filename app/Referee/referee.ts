import { Piece, PieceType, TeamType } from "@/Components/Chessboard/chesboard"

export default class Referee {
    tileIsOccupied(x: number, y:number, boardState: Piece[]) : boolean {
        const piece = boardState.find((p) => p.x === x && p.y === y)
        console.log(typeof piece)
        const ans = piece === undefined? false : true
        return ans
    }
    isValueMove(px:number, py:number, x:number, y:number, type:PieceType, team: TeamType, boardState: Piece[]){

        if (type === PieceType.PAWN){
            const specialRow = (team === TeamType.OUR ) ? 1 : 6
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1

            if (true) {
                if ((px === x) && (y-py === 2 * pawnDirection) && py === specialRow){
                    if (!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,(y-1)*pawnDirection,boardState)){
                        return true
                    }
                } else if (px === x && y - py === 1*pawnDirection) {
                    if (!this.tileIsOccupied(x,y,boardState)){
                        return true
                    }
                } 
            }
        }        if(type == PieceType.PAWN){
            if (team == TeamType.OUR){
                if ((px === x) && (y-py === 2) && py === 1){
                    if (!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-1,boardState)){
                        return true
                    }
                } else if (px === x && y - py === 1) {
                    if (!this.tileIsOccupied(x,y,boardState)){
                        return true
                    }
                }
            } else {
                if ((px === x) && (y-py === -2) && py === 6){
                    if (!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y+1,boardState)){
                        return true
                    }
                } else if (px === x && y - py === -1) {
                    if (!this.tileIsOccupied(x,y,boardState)){
                        return true
                    }
                }{
                    console.log("invalid move")
                }
            }
        }
        return false
    }
}