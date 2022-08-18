export default function HotjarElement({ positions }) {
    return (
        <div className="hotjar-elements">
            <div className="center" style={{width:positions.center.width, height:positions.center.height, left:positions.center.left, top:positions.center.top}}></div>
            <div className="top" style={{ height: positions.top.height }}></div>
            <div className="bottom" style={{ height: positions.bottom.height }} ></div>
            <div className="left" style={{ height: positions.left.height, width: positions.left.width, top: positions.left.top }} ></div>
            <div className="right" style={{ height: positions.right.height, width: positions.right.width, top: positions.right.top }} ></div>
        </div>
    )
}