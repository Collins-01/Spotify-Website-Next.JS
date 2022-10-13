import { useRecoilState } from "recoil";


import React from 'react'
import Track from "../types/track_type";


interface Props{
    track?: Track
}

function Song({track}: Props) {
  return (
    <div>

        <h1>{track?.name}</h1>
    </div>
  )
}

export default Song