
const Skoro = () => {
    const style: any = {
        position: 'absolute',
        top: "0",
        left: "0",
        background: "rgba(255, 255, 255, 0.21)",
        borderRadius: "16px",
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: "blur(5px)",
        width: "100%",
        height: "100%",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:'40px'

    }
    return (
        <div style={style}>

            Скоро
        </div>
    )
}

export default Skoro
