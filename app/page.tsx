import Image from "next/image";
import styles from "./page.module.css";
import './app.css'
import Chessboard from "@/Components/Chessboard/chesboard";
export default function Home() {
  return (
    <div id='app'>
      <Chessboard></Chessboard>
    </div>
  );
}
